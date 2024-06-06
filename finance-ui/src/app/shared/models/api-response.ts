export interface ApiResponse<T, Key extends string> {
  _embedded?: {
    [key in Key]: Array<T>;
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}
