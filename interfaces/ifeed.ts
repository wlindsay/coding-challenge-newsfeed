import { AllFellowship } from './fellowship';
import { IAnnouncement } from './iannouncement';
import { IProject } from './iproject';
import { IUser } from './iuser';

interface IFeedRow {
  id: number;
  type: 'Project' | 'User' | 'Announcement';
}

export type FeedRow = (IUser | IProject | IAnnouncement) & IFeedRow;

export interface IFeed {
  items: (IUser | IProject | IAnnouncement)[];
  count: number;
  hasMore: boolean;
}

export type FeedFilter = 'User' | 'Project' | 'Announcement';

export interface IFeedArgs {
  fellowship: AllFellowship;
  skip: number;
  take: number;
  orderDescending?: boolean;
}
