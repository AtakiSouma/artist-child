export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}
export interface PaginationParams {
  page: number;
  limit: number;
  search: string;
}

export interface PaginationParamsWithId {
  page: number;
  limit: number;
  search: string;
  instructorId: string;
}
export interface replyParams {
  instructorId: string;
  resultId: string;

  replyMessage: string;
}
