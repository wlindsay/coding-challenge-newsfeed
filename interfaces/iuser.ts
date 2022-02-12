import { UserFellowship } from './fellowship';
import { IProject } from './iproject';

export interface IUserRow {
  id: number;
  name: string;
  bio: string;
  avatar_url: string;
  fellowship: UserFellowship;
  created_ts: Date;
  updated_ts: Date;
}

export interface IUser extends IUserRow {
  projects: IProject[];
}
