import { FeedType } from './ifeed';
import { IUser } from './iuser';

export interface IProjectRow {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_ts: string;
  updated_ts: string;
}

export interface IProject extends IProjectRow {
  type: FeedType;
  users: IUser[];
}
