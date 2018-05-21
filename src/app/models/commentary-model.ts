import {ProductModel} from './product-model';

export interface CommentaryModel {
  id;
  text: string;
  product_id;
  user_id;
  created_at: Date;
  product: ProductModel;
}
