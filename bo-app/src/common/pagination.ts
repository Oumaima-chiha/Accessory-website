export interface IPaginationResponse<T> {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  content: T[];
  totalElements: number;
}

export interface IPaginationPayload {
  page: number;
  size: number;
}
