export const API_MEDIA_FIELD_NAME = 'media';

export interface Media {
  url: string;
  publicUrl: string;
}

export interface MediaUploadFile {
  extension: string;
  fileName: string;
  fileSize: string;
  folder: string;
  mimeType: string;
  originalFileName: string;
  publicUrl: string;
  url: string;
}
