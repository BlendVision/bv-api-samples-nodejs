import { Part } from '../interfaces/file-upload.interface';

export class FileUploadRequestDTO {
  file: {
    name: string;
    size: string;
    source: string;
    type: string;
  };
}

export class FileUploadResponseDTO {
  file: {
    id: string;
    type: string;
    name: string;
    size: string;
    uri: string;
    source: string;
    attrs: Record<string, any>;
    created_at: string;
    updated_at: string;
  };
  upload_data: {
    id: string;
    parts: Part[];
  };
}
