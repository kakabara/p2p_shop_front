import {UserModel} from './user-model';

export interface AnswerModel {
  id: number;
  text: string;
  user_id: number;
  user: UserModel;
}
