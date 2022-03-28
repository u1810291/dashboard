import { http } from 'lib/client/http';
import { IWatchlist, CustomWatchlistUpload, WatchlistContentTypes, WatchlistCreateBodyTypes, WatchlistProcess, CustomWatchlistHeaders, CustomWatchlistShortValidation, ICustomWatchlistValidationError } from '../models/CustomWatchlist.models';

export function getMerchantWatchlists(merchantId: string) {
  return http.get<IWatchlist[]>(`/api/v1/merchants/${merchantId}/watchlists`, { params: { embed: 'process' } });
}

export function getMerchantWatchlistById(merchantId: string, watchlistId: number) {
  return http.get<IWatchlist>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`, { params: { embed: 'process' } });
}

export function deleteMerchantWatchlistById(merchantId: string, watchlistId: number) {
  return http.delete<boolean>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`);
}

export function createMerchantWatchlist(merchantId: string, body: WatchlistCreateBodyTypes) {
  return http.post<IWatchlist>(`/api/v1/merchants/${merchantId}/watchlists`, body);
}

export function updateMerchantWatchlistById(merchantId: string, watchlistId: number, body: WatchlistCreateBodyTypes) {
  return http.patch<IWatchlist>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`, body);
}

export function updateMerchantWatchlistContentById(merchantId: string, watchlistId: number, body: WatchlistContentTypes) {
  return http.post<{ id: number; process: Pick<WatchlistProcess, 'inputSourceFileName' | 'csvSeparator'> }>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}/content`, body);
}

export function uploadMerchantWatchlist(merchantId: string, body: FormData) {
  return http.post<CustomWatchlistUpload>(`/api/v1/merchants/${merchantId}/watchlists/file`, body);
}

export function getWatchlistHeaders(merchantId: string, body: CustomWatchlistHeaders) {
  return http.post<{ headers: string[] }>(`/api/v1/merchants/${merchantId}/watchlists/extract-headers`, body);
}

export function getWatchlistShortValidation(merchantId: string, body: CustomWatchlistShortValidation) {
  return http.post<ICustomWatchlistValidationError>(`/api/v1/merchants/${merchantId}/watchlists/short-validate`, body);
}
