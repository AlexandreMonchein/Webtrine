import imageCompression from "browser-image-compression";
import { useCallback, useMemo, useState } from "react";

import type {
  AttachmentConfig,
  CloudConfig,
  ImageDisplayFeature,
} from "../design-system/components/contact/tattooContact.types";

export type ImageUploadResult = {
  images: Array<File | string>;
  totalSize: number;
  maxSize: number;
  errors: string[];
};

type UseImageUploadConfig = {
  feature: ImageDisplayFeature;
  t: (key: string) => string;
};

const DEFAULT_ATTACHMENT_CONFIG: AttachmentConfig = {
  maxTotalSizeKB: 500,
  maxPhotos: 2,
  targetSizePerPhotoKB: 240,
  maxResolution: 1400,
  compressionQuality: 0.85,
};

const DEFAULT_CLOUD_CONFIG: Partial<CloudConfig> = {
  maxPhotos: 3,
  transformation: {
    width: 1920,
    height: 1080,
    crop: "limit",
    quality: "auto:good",
  },
};

export const useImageUpload = ({ feature, t }: UseImageUploadConfig) => {
  const [images, setImages] = useState<Array<File | string>>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const config = useMemo(
    () =>
      feature.type === "attachment"
        ? { ...DEFAULT_ATTACHMENT_CONFIG, ...feature.attachment }
        : { ...DEFAULT_CLOUD_CONFIG, ...feature.cloud },
    [feature],
  );

  const maxPhotos = config?.maxPhotos || 3;

  const compressImage = useCallback(
    async (file: File): Promise<File> => {
      if (feature.type !== "attachment") return file;

      const attachmentConfig = config as AttachmentConfig;
      const options = {
        maxSizeMB: attachmentConfig.targetSizePerPhotoKB / 1024,
        maxWidthOrHeight: attachmentConfig.maxResolution,
        useWebWorker: true,
        quality: attachmentConfig.compressionQuality,
      };

      try {
        const compressedBlob = await imageCompression(file, options);
        // Ensure we return a File, not just a Blob
        if (compressedBlob instanceof File) {
          return compressedBlob;
        } else {
          return new File([compressedBlob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
        }
      } catch (error) {
        console.error("Image compression error:", error);
        throw new Error("Image compression failed");
      }
    },
    [feature.type, config],
  );

  const reduceImageForCloud = useCallback(
    async (file: File): Promise<File> => {
      if (feature.type !== "cloud") return file;

      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        quality: 0.85,
      };

      try {
        const reducedBlob = await imageCompression(file, options);
        // Ensure we return a File, not just a Blob
        if (reducedBlob instanceof File) {
          return reducedBlob;
        } else {
          return new File([reducedBlob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
        }
      } catch (error) {
        console.error("Image reduction error:", error);
        throw new Error("Image reduction failed");
      }
    },
    [feature.type],
  );

  const uploadToCloudinary = useCallback(
    async (file: File): Promise<string> => {
      if (feature.type !== "cloud" || !feature.cloud) {
        throw new Error("Cloud configuration is missing");
      }

      const cloudConfig = feature.cloud;
      const reducedFile = await reduceImageForCloud(file);

      const formData = new FormData();
      formData.append("file", reducedFile);
      formData.append("upload_preset", cloudConfig.uploadPreset);

      if (cloudConfig.folder) {
        formData.append("folder", cloudConfig.folder);
      }

      if (cloudConfig.transformation) {
        const transformation = Object.entries(cloudConfig.transformation)
          .map(([key, value]) => `${key}_${value}`)
          .join(",");
        formData.append("transformation", transformation);
      }

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudConfig.cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error(`Cloudinary upload failed: ${response.status}`);
        }

        const data = await response.json();
        return data.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
      }
    },
    [feature, reduceImageForCloud],
  );

  const uploadImages = useCallback(
    async (files: FileList | null): Promise<ImageUploadResult> => {
      if (!files || files.length === 0) {
        return { images: [], totalSize: 0, maxSize: 0, errors: [] };
      }

      setIsUploading(true);
      setErrors([]);

      const validImages: Array<File | string> = [];
      const validationErrors: string[] = [];
      const maxSize = 3 * 1024 * 1024; // 3MB before compression
      const absoluteMaxSize = 15 * 1024 * 1024; // 15MB absolute limit

      const filesToProcess = Array.from(files).slice(0, maxPhotos);

      try {
        // Process all files
        const results = await Promise.all(
          filesToProcess.map(async (file) => {
            // Check absolute maximum file size first
            if (file.size > absoluteMaxSize) {
              return {
                error: `${file.name}: ${t("contact.tattoo.errorTooLargeAbsolute")}`,
              };
            }

            // Check file size
            if (file.size > maxSize) {
              return {
                error: `${file.name}: ${t("contact.tattoo.errorTooLarge")}`,
              };
            }

            // Check file type
            if (!file.type.startsWith("image/")) {
              return {
                error: `${file.name}: ${t("contact.tattoo.errorNotImage")}`,
              };
            }

            try {
              if (feature.type === "attachment") {
                // Compress and return File
                const compressedFile = await compressImage(file);
                return { file: compressedFile };
              } else {
                // Cloud mode: reduce and store File (upload later on submit)
                const reducedFile = await reduceImageForCloud(file);
                return { file: reducedFile };
              }
            } catch (error) {
              console.error(`Compression failed for ${file.name}:`, error);
              return {
                error: `${file.name}: ${t("contact.tattoo.errorCompressionFailed")}`,
              };
            }
          }),
        );

        results.forEach((result) => {
          if ("file" in result && result.file) {
            validImages.push(result.file);
          } else if ("error" in result && result.error) {
            validationErrors.push(result.error);
          }
        });

        if (files.length > maxPhotos) {
          validationErrors.push(t("contact.tattoo.errorMaxFiles"));
        }

        setImages((prev) => {
          // Check for duplicates by filename
          const duplicates: string[] = [];
          const uniqueImages: Array<File | string> = [];
          const existingNames = new Set(
            prev.map((img) => (img instanceof File ? img.name : img)),
          );

          validImages.forEach((img) => {
            const imgName = img instanceof File ? img.name : img;
            if (existingNames.has(imgName)) {
              duplicates.push(imgName);
            } else {
              uniqueImages.push(img);
              existingNames.add(imgName);
            }
          });

          if (duplicates.length > 0) {
            const duplicateMsg = `${duplicates.join(", ")} - ${t("contact.tattoo.errorDuplicate")}`;
            setErrors((prevErrors) => [...prevErrors, duplicateMsg]);
          }

          const finalCombined = [...prev, ...uniqueImages];
          return finalCombined.slice(0, maxPhotos);
        });

        setErrors(validationErrors);

        const totalSize =
          feature.type === "attachment"
            ? validImages.reduce(
                (acc, img) => acc + (img instanceof File ? img.size : 0),
                0,
              )
            : 0;

        const maxTotalSize =
          feature.type === "attachment"
            ? (config as AttachmentConfig).maxTotalSizeKB * 1024
            : 0;

        return {
          images: validImages,
          totalSize,
          maxSize: maxTotalSize,
          errors: validationErrors,
        };
      } finally {
        setIsUploading(false);
      }
    },
    [feature, config, maxPhotos, t, compressImage, reduceImageForCloud],
  );

  const uploadStoredImagesToCloud = useCallback(async (): Promise<{
    urls: string[];
    errors: string[];
  }> => {
    if (feature.type !== "cloud") {
      return { urls: [], errors: [] };
    }

    const fileImages = images.filter((img): img is File => img instanceof File);

    if (fileImages.length === 0) {
      return { urls: [], errors: [] };
    }

    setIsUploading(true);
    const urls: string[] = [];
    const uploadErrors: string[] = [];

    try {
      const results = await Promise.all(
        fileImages.map(async (file) => {
          try {
            const url = await uploadToCloudinary(file);
            return { url };
          } catch (error) {
            return {
              error: `${file.name}: ${t("contact.tattoo.errorUpload")}`,
            };
          }
        }),
      );

      results.forEach((result) => {
        if ("url" in result && result.url) {
          urls.push(result.url);
        } else if ("error" in result && result.error) {
          uploadErrors.push(result.error);
        }
      });

      if (uploadErrors.length > 0) {
        setErrors((prev) => [...prev, ...uploadErrors]);
      }

      return { urls, errors: uploadErrors };
    } finally {
      setIsUploading(false);
    }
  }, [feature, images, uploadToCloudinary, t]);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
    setErrors([]);
  }, []);

  const totalSize =
    feature.type === "attachment"
      ? images.reduce(
          (acc, img) => acc + (img instanceof File ? img.size : 0),
          0,
        )
      : 0;

  const maxSize =
    feature.type === "attachment"
      ? (config as AttachmentConfig).maxTotalSizeKB * 1024
      : 0;

  return {
    images,
    errors,
    isUploading,
    totalSize,
    maxSize,
    maxPhotos,
    mode: feature.type,
    uploadImages,
    uploadStoredImagesToCloud,
    removeImage,
    clearImages,
  };
};
