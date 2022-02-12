import React from 'react';
import UserCard, { User } from 'components/UserCard';
import ProjectCard, { Project } from 'components/ProjectCard';
import AnnouncementCard, { Announcement } from 'components/AnnouncementCard';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  feed: Feed;
  hasMore: boolean;
  fetchMore: () => void;
};

export type Feed = (User | Project | Announcement)[];

export default function FeedComponent({ feed, hasMore, fetchMore }: Props) {
  return (
    <InfiniteScroll
      dataLength={feed.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {feed.map((f, i) => {
        switch (f.type) {
          case 'User':
            return <UserCard key={i} user={f as User} />;
          case 'Project':
            return <ProjectCard key={i} project={f as Project} />;
          case 'Announcement':
            return (
              <AnnouncementCard key={i} announcement={f as Announcement} />
            );
        }
      })}
    </InfiniteScroll>
  );
}
