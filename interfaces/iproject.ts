import { IUser } from './iuser';

export interface IProjectRow {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_ts: Date;
  updated_ts: Date;
}

export interface IProject extends IProjectRow {
  users: IUser[];
}
