import { http } from 'lib/client/http';
import { FullSupportedLocales } from 'models/Intl.model';
import { ProductBoardTokenResponse } from '../model/ProductBoard.model';

export function getProductBoardSSOToken(locale: FullSupportedLocales) {
  return http.get<ProductBoardTokenResponse>(`/api/v1/productboard/auth?locale=${locale}`);
}
