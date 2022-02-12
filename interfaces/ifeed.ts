import { AllFellowship } from './fellowship';
import { IAnnouncement } from './iannouncement';
import { IProject } from './iproject';
import { IUser } from './iuser';

export type FeedRow = IUser | IProject | IAnnouncement;

export type IFeed = FeedRow[];

export type FeedType = 'User' | 'Project' | 'Announcement';

export interface IFeedArgs {
  fellowship: AllFellowship;
  offset: number;
  limit: number;
  orderDescending?: boolean;
}
