import { AllFellowship } from './fellowship';
import { IAnnouncement } from './iannouncement';
import { IProject } from './iproject';
import { IUser } from './iuser';

interface IFeedRow {
  id: number;
  type: 'Project' | 'User' | 'Announcement';
}

export type FeedRow = IUser | IProject | IAnnouncement;

export type IFeed = (IUser | IProject | IAnnouncement)[];

export type FeedType = 'User' | 'Project' | 'Announcement';

export interface IFeedArgs {
  fellowship: AllFellowship;
  offset: number;
  limit: number;
  orderDescending?: boolean;
}
