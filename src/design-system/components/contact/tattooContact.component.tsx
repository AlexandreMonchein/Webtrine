import emailjs from "@emailjs/browser";
import imageCompression from "browser-image-compression";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { showPopUp } from "../../../store/state.action";
import { getClient } from "../../../store/state.selector";
import PopUp from "../popup/popUp.component";
import styles from "./tattooContact.module.css";
import type { Artist, TattooContactProps } from "./tattooContact.types";

export const TattooContact = ({ datas }: TattooContactProps) => {
  const { artists, "data-testid": dataTestid } = datas;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [artistInput, setArtistInput] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoErrors, setPhotoErrors] = useState<string[]>([]);
  const client = useSelector(getClient).contact;
  const { mailTemplate: templateId, mailServiceId: serviceId } = client;

  useEffect(() => emailjs.init("OYqEmnhZaB6k1hEGB"), []);

  // Pre-select artist from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get("artist");

    if (artistName && !selectedArtist) {
      const matchedArtist = artists.find(
        (artist) => artist.artistName === artistName,
      );

      if (matchedArtist) {
        setArtistInput(artistName);
        setSelectedArtist(matchedArtist);
      }
    }
  }, [artists, selectedArtist]);

  const compressImage = useCallback(async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.01, // 10KB max pour test
      maxWidthOrHeight: 800,
      useWebWorker: true,
      quality: 0.5,
    };

    try {
      const compressedFile = await imageCompression(file, options);

      return compressedFile;
    } catch (error) {
      console.error("Image compression error:", error);
      return file; // Return original if compression fails
    }
  }, []);

  const validatePhotos = useCallback(
    async (files: FileList | null): Promise<File[]> => {
      if (!files) return [];

      const validFiles: File[] = [];
      const errors: string[] = [];
      const maxSize = 10 * 1024 * 1024; // 10MB before compression
      const maxFiles = 1; // Limited to 1 photo due to EmailJS 50KB variable limit

      const filesToProcess = Array.from(files).slice(0, maxFiles);

      // Process all files in parallel for better performance
      const results = await Promise.all(
        filesToProcess.map(async (file) => {
          if (!file.type.startsWith("image/")) {
            return {
              error: `${file.name}: ${t("contact.tattoo.errorNotImage")}`,
            };
          }

          if (file.size > maxSize) {
            return {
              error: `${file.name}: ${t("contact.tattoo.errorTooLarge")}`,
            };
          }

          try {
            // Compress the image before adding
            const compressedFile = await compressImage(file);
            return { file: compressedFile };
          } catch (error) {
            return {
              error: `${file.name}: ${t("contact.tattoo.errorNotImage")}`,
            };
          }
        }),
      );

      // Separate files and errors
      results.forEach((result) => {
        if ("file" in result && result.file) {
          validFiles.push(result.file);
        } else if ("error" in result) {
          errors.push(result.error);
        }
      });

      if (files.length > maxFiles) {
        errors.push(t("contact.tattoo.errorMaxFiles"));
      }

      setPhotoErrors(errors);
      return validFiles;
    },
    [t, compressImage],
  );

  const handlePhotoChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const validatedPhotos = await validatePhotos(e.target.files);

      // Store compressed photos in state (we'll inject them into the input on submit)
      setPhotos((prev) => {
        const combined = [...prev, ...validatedPhotos];
        const result = combined.slice(0, 1); // Limit to 1 photo (EmailJS 50KB limit)

        return result;
      });
    },
    [validatePhotos],
  );

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleArtistSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setArtistInput(value);

      // Check if the value matches an artist name
      const matchedArtist = artists.find(
        (artist) => artist.artistName === value,
      );

      if (matchedArtist) {
        setSelectedArtist(matchedArtist);
      } else {
        setSelectedArtist(null);
      }
    },
    [artists],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isSubmitting || !selectedArtist) return;

      setIsSubmitting(true);

      const formElement = e.target as HTMLFormElement;

      try {
        // Create FormData manually with all form fields + compressed photos
        const manualFormData = new FormData();

        // Add all text fields from the form
        const formData = new FormData(formElement);
        for (const [key, value] of formData.entries()) {
          if (key !== "photos") {
            manualFormData.append(key, value);
          }
        }

        // Add compressed photos from state
        photos.forEach((photo) => {
          manualFormData.append("photos", photo, photo.name);
        });

        // Add photo count
        manualFormData.set("photoCount", photos.length.toString());

        // Add EmailJS required fields
        manualFormData.append("lib_version", "4.3.3");
        manualFormData.append("service_id", serviceId);
        manualFormData.append("template_id", templateId);
        manualFormData.append("user_id", "OYqEmnhZaB6k1hEGB");

        // Send directly to EmailJS API
        const apiResponse = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send-form",
          {
            method: "POST",
            body: manualFormData,
          },
        );

        if (!apiResponse.ok) {
          throw new Error(`EmailJS API error: ${apiResponse.status}`);
        }

        dispatch(
          showPopUp({
            type: "success",
            message: t("contact.emailSentSuccess"),
          }),
        );

        formElement.reset();
        setPhotos([]);
        setPhotoErrors([]);
      } catch (error) {
        console.error("Email sending error:", error);
        console.error("Error details:", {
          message: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        });
        dispatch(
          showPopUp({
            type: "error",
            message: t("contact.emailSentError"),
          }),
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, selectedArtist, photos, serviceId, templateId, dispatch, t],
  );

  const hasValidEmailForForm =
    selectedArtist?.mail && !selectedArtist.mail.startsWith("mailto:");

  return (
    <section className={styles.tattooContactRoot} data-testid={dataTestid}>
      <PopUp />
      <div className={styles.container}>
        <h1 className={styles.title}>{t("contact.tattoo.title")}</h1>
        <p className={styles.description}>{t("contact.tattoo.description")}</p>
        <div>
          <div className={styles.field}>
            <label htmlFor="artist-select" className={styles.label}>
              {t("contact.tattoo.artistLabel")}
              <span className={styles.required} aria-label="requis">
                *
              </span>
            </label>
            <p id="artist-hint" className={styles.hint}>
              {t("contact.tattoo.artistHint")}
            </p>
            <select
              id="artist-select"
              value={artistInput}
              onChange={handleArtistSelectChange}
              className={styles.select}
              required
              aria-describedby="artist-hint"
            >
              <option value="" disabled>
                {t("contact.tattoo.artistPlaceholder")}
              </option>
              {artists.map((artist) => (
                <option key={artist.artistName} value={artist.artistName}>
                  {artist.artistName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedArtist && (
          <>
            {hasValidEmailForForm ? (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                {/* Hidden fields for EmailJS template variables */}
                <input
                  type="hidden"
                  name="artistName"
                  value={selectedArtist.artistName}
                />
                <input
                  type="hidden"
                  name="artistMail"
                  value={selectedArtist.mail || "webtrine.pro@gmail.com"}
                />
                <input
                  type="hidden"
                  name="replyTo"
                  value={selectedArtist.mail || "webtrine.pro@gmail.com"}
                />
                <input
                  type="hidden"
                  name="photoCount"
                  value={photos.length.toString()}
                />

                <div className={styles.formGrid}>
                  {/* Email */}
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>
                      {t("contact.email")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-email">
                      {t("contact.emailHint")}
                    </p>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={styles.input}
                      placeholder={t("contact.emailPlaceholder")}
                      required
                      aria-describedby="hint-email"
                      aria-required="true"
                    />
                  </div>

                  {/* Name */}
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>
                      {t("contact.name")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-name">
                      {t("contact.nameHint")}
                    </p>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={styles.input}
                      placeholder={t("contact.namePlaceholder")}
                      required
                      aria-describedby="hint-name"
                      aria-required="true"
                    />
                  </div>

                  {/* Phone */}
                  <div className={styles.field}>
                    <label htmlFor="phone" className={styles.label}>
                      {t("contact.phone")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-phone">
                      {t("contact.phoneHint")}
                    </p>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={styles.input}
                      placeholder={t("contact.phonePlaceholder")}
                      required
                      aria-describedby="hint-phone"
                      aria-required="true"
                    />
                  </div>

                  {/* Object */}
                  <div className={classNames(styles.field, styles.fieldFull)}>
                    <label htmlFor="object" className={styles.label}>
                      {t("contact.tattoo.object")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-object">
                      {t("contact.tattoo.objectHint")}
                    </p>
                    <input
                      type="text"
                      id="object"
                      name="object"
                      className={styles.input}
                      placeholder={t("contact.tattoo.objectPlaceholder")}
                      required
                      aria-describedby="hint-object"
                      aria-required="true"
                    />
                  </div>

                  {/* Description */}
                  <div className={classNames(styles.field, styles.fieldFull)}>
                    <label htmlFor="description" className={styles.label}>
                      {t("contact.content")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-description">
                      {t("contact.tattoo.descriptionHint")}
                    </p>
                    <textarea
                      id="description"
                      name="description"
                      className={styles.textarea}
                      placeholder={t("contact.tattoo.descriptionPlaceholder")}
                      rows={6}
                      required
                      aria-describedby="hint-description"
                      aria-required="true"
                    />
                  </div>

                  {/* Tattoo Size */}
                  <div className={styles.field}>
                    <label htmlFor="tattooSize" className={styles.label}>
                      {t("contact.tattoo.size")} (cm){" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-tattooSize">
                      {t("contact.tattoo.sizeHint")}
                    </p>
                    <input
                      type="text"
                      id="tattooSize"
                      name="tattooSize"
                      className={styles.input}
                      placeholder={t("contact.tattoo.sizePlaceholder")}
                      required
                      aria-describedby="hint-tattooSize"
                      aria-required="true"
                    />
                  </div>

                  {/* Tattoo Zone */}
                  <div className={styles.field}>
                    <label htmlFor="tattooZone" className={styles.label}>
                      {t("contact.tattoo.zone")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-tattooZone">
                      {t("contact.tattoo.zoneHint")}
                    </p>
                    <input
                      type="text"
                      id="tattooZone"
                      name="tattooZone"
                      className={styles.input}
                      placeholder={t("contact.tattoo.zonePlaceholder")}
                      required
                      aria-describedby="hint-tattooZone"
                      aria-required="true"
                    />
                  </div>

                  {/* Photos (optional) */}
                  <div className={classNames(styles.field, styles.fieldFull)}>
                    <label htmlFor="photos" className={styles.label}>
                      {t("contact.tattoo.photos")}
                    </label>
                    <p className={styles.hint} id="hint-photos">
                      {t("contact.tattoo.photosHint")}
                    </p>
                    <input
                      type="file"
                      id="photos"
                      name="photos"
                      className={styles.inputFile}
                      accept="image/*"
                      onChange={handlePhotoChange}
                      aria-describedby="hint-photos"
                      disabled={photos.length >= 1}
                    />

                    {photoErrors.length > 0 && (
                      <ul
                        className={styles.errorList}
                        role="alert"
                        aria-live="polite"
                      >
                        {photoErrors.map((error) => (
                          <li key={error} className={styles.errorItem}>
                            {error}
                          </li>
                        ))}
                      </ul>
                    )}

                    {photos.length > 0 && (
                      <div className={styles.photoPreviewContainer}>
                        {photos.map((photo, idx) => (
                          <div key={photo.name} className={styles.photoPreview}>
                            <span className={styles.photoName}>
                              {photo.name}
                            </span>
                            <button
                              type="button"
                              className={styles.removePhotoButton}
                              onClick={() => removePhoto(idx)}
                              aria-label={`${t("contact.tattoo.removePhoto")} ${photo.name}`}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Availability */}
                  <div className={styles.field}>
                    <label htmlFor="availability" className={styles.label}>
                      {t("contact.tattoo.availability")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-availability">
                      {t("contact.tattoo.availabilityHint")}
                    </p>
                    <input
                      type="text"
                      id="availability"
                      name="availability"
                      className={styles.input}
                      placeholder={t("contact.tattoo.availabilityPlaceholder")}
                      required
                      aria-describedby="hint-availability"
                      aria-required="true"
                    />
                  </div>

                  {/* Budget (optional) */}
                  <div className={styles.field}>
                    <label htmlFor="budget" className={styles.label}>
                      {t("contact.tattoo.budget")}
                    </label>
                    <p className={styles.hint} id="hint-budget">
                      {t("contact.tattoo.budgetHint")}
                    </p>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      className={styles.input}
                      placeholder={t("contact.tattoo.budgetPlaceholder")}
                      aria-describedby="hint-budget"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? t("contact.sending") : t("contact.send")}
                </button>
              </form>
            ) : (
              <div className={styles.noMailContainer}>
                <p className={styles.noMailMessage}>
                  {t("contact.tattoo.noMailMessage")}
                </p>
                <a
                  href={
                    selectedArtist.mail?.includes("mailto")
                      ? selectedArtist.mail
                      : `mailto:${selectedArtist.mail}?subject=${encodeURIComponent(
                          `${t("contact.tattoo.mailSubject")} ${selectedArtist.artistName}`,
                        )}`
                  }
                  className={styles.mailtoButton}
                  aria-label={t("contact.tattoo.openMailApp")}
                >
                  {t("contact.tattoo.openMail")}
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TattooContact;
