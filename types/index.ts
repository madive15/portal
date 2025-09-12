export type PagingQueryType = {
  page: number;
  size: number;
};

export type GridCodeType = {
  label?: string;
  text?: string;
  value?: string;
};

export type FileInfoType = {
  fileId: number;
  fileOriginalName: string;
  filePath: string;
  fileMimeType: string;
  fileSize: number;
  fileAltText: string;
  fileDownloadCount: number;
};

export interface CommonCode {
  text?: string; // 코드명
  label?: string; // 코드명
  value?: string; // 코드
}

export interface ListResponse<D> {
  totalElements: number;
  totalPages?: number;
  content: D[];
}
