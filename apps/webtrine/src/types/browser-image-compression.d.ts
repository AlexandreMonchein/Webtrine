declare module "browser-image-compression" {
  interface Options {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    useWebWorker?: boolean;
    quality?: number;
    maxIteration?: number;
    fileType?: string;
    initialQuality?: number;
    alwaysKeepResolution?: boolean;
    signal?: AbortSignal;
    onProgress?: (progress: number) => void;
    preserveExif?: boolean;
  }

  function imageCompression(file: File, options: Options): Promise<File>;

  export default imageCompression;
}
