import {ProductModel} from './product-model';
import {UserModel} from './user-model';

export interface CommentaryModel {
  id;
  text: string;
  product_id;
  user_id;
  created_at: Date;
  product: ProductModel;
  user: UserModel;
}
