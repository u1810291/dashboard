import { http } from 'lib/client/http';
import { IWatchlist, IWatchlistValidation, IWatchlistUpload, IWatchlistContent, IWatchlistProcess, IWatchlistCreateBody, IWatchlistHeaders, IWatchlistShortValidation } from 'models/Watchlist.model';

export function getMerchantWatchlists(merchantId: string) {
  return http.get<IWatchlist[]>(`/api/v1/merchants/${merchantId}/watchlists`, { params: { embed: 'process' } });
}

export function getMerchantWatchlistById(merchantId: string, watchlistId: number) {
  return http.get<IWatchlist>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`, { params: { embed: 'process' } });
}

export function deleteMerchantWatchlistById(merchantId: string, watchlistId: number) {
  return http.delete<boolean>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`);
}

export function createMerchantWatchlist(merchantId: string, body: IWatchlistCreateBody) {
  return http.post<IWatchlist>(`/api/v1/merchants/${merchantId}/watchlists`, body);
}

export function updateMerchantWatchlistById(merchantId: string, watchlistId: number, body: IWatchlistCreateBody) {
  return http.patch<IWatchlist>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`, body);
}

export function updateMerchantWatchlistContentById(merchantId: string, watchlistId: number, body: IWatchlistContent) {
  return http.post<{ id: number; process: Pick<IWatchlistProcess, 'inputSourceFileName' | 'csvSeparator'> }>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}/content`, body);
}

export function uploadMerchantWatchlist(merchantId: string, body: FormData) {
  return http.post<IWatchlistUpload>(`/api/v1/merchants/${merchantId}/watchlists/file`, body);
}

export function getWatchlistHeaders(merchantId: string, body: IWatchlistHeaders) {
  return http.post<{ headers: string[] }>(`/api/v1/merchants/${merchantId}/watchlists/extract-headers`, body);
}

export function getWatchlistShortValidation(merchantId: string, body: IWatchlistShortValidation) {
  return http.post<IWatchlistValidation>(`/api/v1/merchants/${merchantId}/watchlists/short-validate`, body);
}
