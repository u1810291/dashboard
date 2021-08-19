import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { CustomWatchlist } from '../services/CustomWatchlist.service';

export const CustomWatchlistInit = () => (): ProductTypes => {
  const customWatchlist = new CustomWatchlist();
  productManagerService.register(customWatchlist);
  return customWatchlist.id;
};
