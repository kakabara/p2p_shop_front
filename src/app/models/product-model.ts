import {UserModel} from './user-model';

export interface ProductModel {
  id;
  name: string;
  price;
  description: string;
  user_id;
  bought_at;
  image_hash: string;
  bought_by: number | undefined;
  buyer: UserModel | undefined;
}
