import { UserFellowship } from './fellowship';
import { FeedType } from './ifeed';
import { IProject } from './iproject';

export interface IUserRow {
  id: number;
  name: string;
  bio: string;
  avatar_url: string;
  fellowship: UserFellowship;
  created_ts: string;
  updated_ts: string;
}

export interface IUser extends IUserRow {
  type: FeedType;
  projects: IProject[];
}
