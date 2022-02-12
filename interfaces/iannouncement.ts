import { AllFellowship } from './fellowship';
import { FeedType } from './ifeed';

export interface IAnnouncement {
  id: number;
  fellowship: AllFellowship;
  title: string;
  body: string;
  created_ts: string;
  updated_ts: string;
  type: FeedType;
}
