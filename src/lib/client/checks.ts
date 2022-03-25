import { http } from 'lib/client/http';
import { ApiResponse } from 'models/Client.model';

// TODO: Set actual type instead of generic
export async function getFileContents<T>(url: string): Promise<ApiResponse<T>> {
  return http.get(url);
}
