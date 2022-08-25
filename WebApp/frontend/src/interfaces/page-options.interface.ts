import { OrderByOption } from '../enums/order-by-option.enum';
import { OrderOption } from '../enums/order-option.enum';

export interface IPageOptions {
  pageIndex: number;
  limit: number;
  order: OrderOption;
  orderBy: OrderByOption;
  hasMore?: boolean;
}
