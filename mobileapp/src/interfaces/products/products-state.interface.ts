import {IProductError} from './product-error.interface';
import {IProduct} from './product.interface';

export interface IProductsState {
  product: IProduct | null;
  products: IProduct[];
  isLoading: boolean;
  error: IProductError;
}
