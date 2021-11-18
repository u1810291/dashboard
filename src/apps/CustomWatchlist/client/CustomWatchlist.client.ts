import { http } from 'lib/client/http';
import { Watchlist } from 'models/CustomWatchlist.model';

// TODO: @richvoronov replace Object in params with normal type on STAGE 2
export function getMerchantWatchlistsById(merchantId: string, params: Object) {
  return http.get<Watchlist[]>(`/api/v1/merchants/${merchantId}/watchlists`, { params });
}

export function deleteMerchantWatchlistById(merchantId: string, watchlistId: number) {
  return http.delete(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`);
}

// TODO: @richvoronov replace Object in params with normal type on STAGE 2
export function createMerchantWatchlistById(merchantId: string, body: Object) {
  return http.post<Watchlist>(`/api/v1/merchants/${merchantId}/watchlists`, body);
}

// TODO: @richvoronov replace Object in params with normal type on STAGE 2
export function updateMerchantWatchlistById(merchantId: string, watchlistId: number, body: Object) {
  return http.patch<Watchlist>(`/api/v1/merchants/${merchantId}/watchlists/${watchlistId}`, body);
}

// TODO: @richvoronov replace Object in params with normal type on STAGE 2
export function uploadMerchantWatchlist(body: Object) {
  return http.post('/v1/media', body);
}
