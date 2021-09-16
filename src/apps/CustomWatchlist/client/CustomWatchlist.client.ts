import { http } from 'lib/client/http';
import { Watchlist } from 'models/CustomWatchlist.model';

export function getMerchantWatchlistsById(merchantId: string, params: Object) {
  return http.get<Watchlist[]>(`/api/v1/merchants/${merchantId}/watchlists`, { params });
}

// TODO: check what delete handle return and maybe push response to store
export function deleteMerchantWatchlistById(merchantId: string, watchlistId: number) {
  return http.delete(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`);
}
// TODO: replace Object in params with normal type
export function createMerchantWatchlistById(merchantId: string, body: Object) {
  return http.post<Watchlist>(`/api/v1/merchants/${merchantId}/watchlists`, body);
}

// TODO: replace Object in params with normal type
export function updateMerchantWatchlistById(merchantId: string, watchlistId: number, body: Object) {
  return http.patch<Watchlist>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`, body);
}

// TODO: replace Object in params with normal type
export function uploadMerchantWatchlist(body: Object) {
  return http.post('/v1/media', body);
}
