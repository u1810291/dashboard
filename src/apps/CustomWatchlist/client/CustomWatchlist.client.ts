import { http } from 'lib/client/http';
import { Watchlist, CustomWatchlistUpload, WatchlistContentTypes, WatchlistCreateBodyTypes } from 'models/CustomWatchlist.model';

export function getMerchantWatchlists(merchantId: string) {
  return http.get<Watchlist[]>(`/api/v1/merchants/${merchantId}/watchlists?embed=process`);
}

export function deleteMerchantWatchlistById(merchantId: string, watchlistId: number) {
  return http.delete(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`);
}

export function createMerchantWatchlist(merchantId: string, body: WatchlistCreateBodyTypes) {
  return http.post<Watchlist>(`/api/v1/merchants/${merchantId}/watchlists`, body);
}

export function updateMerchantWatchlistById(merchantId: string, watchlistId: number, body: WatchlistCreateBodyTypes) {
  return http.patch<Watchlist>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`, body);
}

export function updateMerchantWatchlistContentById(merchantId: string, watchlistId: number, body: WatchlistContentTypes) {
  return http.post<Watchlist>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}/content`, body);
}

export function uploadMerchantWatchlist(body: FormData) {
  return http.post<CustomWatchlistUpload>('/v1/media', body);
}
