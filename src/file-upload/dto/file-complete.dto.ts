import { Part } from '../interfaces/file-upload.interface';

export class FileCompleteRequestDTO {
  complete_data: {
    checksum_sha1: string;
    id: string;
    parts: Part[];
  };
}
