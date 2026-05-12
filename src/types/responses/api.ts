export interface ApiResponseError {
  status: number;
  error: string;
}

export interface ApiResponse<T = any> {
  status: number;
  data: T | null;
}