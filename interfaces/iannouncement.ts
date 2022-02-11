import { AllFellowship } from './fellowship';

export type AnnouncementRow = {
  id: number;
  fellowship: AllFellowship;
  title: string;
  body: string;
  created_ts: Date;
  updated_ts: Date;
};
