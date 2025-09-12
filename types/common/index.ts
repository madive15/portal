export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
};

export type PagingQuery = {
  page: number;
  size: number;
};

export class PageType {}
