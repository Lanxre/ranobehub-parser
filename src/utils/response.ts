import type { ApiResponse, ApiResponseError } from '@/types/responses/api';

export function createResponse<T = any>(
  status: number,
  data: T | null = null,
  error: string | null = null
): Response {

  if (error) {
    const errorBody: ApiResponseError = { status, error };
    return new Response(JSON.stringify(errorBody), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const body: ApiResponse<T> = {
    status,
    data
  };

  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
