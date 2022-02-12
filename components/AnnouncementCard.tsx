import React from 'react';
import Card from './Card';
import { IAnnouncement } from 'interfaces';

type Props = {
  announcement: Announcement;
};

export type Announcement = Pick<
  IAnnouncement,
  'id' | 'created_ts' | 'fellowship' | 'title' | 'body' | 'type'
>;

export default function AnnouncementCard({ announcement }: Props) {
  return (
    <Card>
      <h2>{announcement.title}</h2>
      <p>Fellowship: {announcement.fellowship}</p>
      <p>{announcement.body}</p>
    </Card>
  );
}
