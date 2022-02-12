import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import { gql, useQuery } from '@apollo/client';
import FeedComponent, { Feed } from 'components/FeedComponent';
import { IFeedArgs } from 'interfaces';

const FEED_QUERY = gql`
  query feed(
    $fellowship: String!
    $offset: Int!
    $limit: Int!
    $orderDescending: Boolean
  ) {
    feed(
      fellowship: $fellowship
      orderDescending: $orderDescending
      offset: $offset
      limit: $limit
    ) {
      ... on User {
        id
        name
        bio
        fellowship
        avatar_url
        created_ts
        type
        projects {
          id
          name
          icon_url
        }
      }
      ... on Project {
        id
        name
        description
        icon_url
        created_ts
        type
        users {
          id
          name
          avatar_url
        }
      }
      ... on Announcement {
        id
        created_ts
        fellowship
        title
        body
        type
      }
    }
  }
`;

type QueryData = {
  feed: Feed;
};

const PAGE_SIZE = 10;
export default function Home() {
  const [feedArgs, setFeedArgs] = useState<IFeedArgs>({
    fellowship: 'all',
    offset: 0,
    limit: PAGE_SIZE,
    orderDescending: true
  });
  const { data, error } = useQuery<QueryData, IFeedArgs>(FEED_QUERY, {
    variables: feedArgs
  });
  const [feed, setFeed] = useState<Feed>([]);
  useEffect(() => {
    if (!data) {
      return;
    }

    setFeed([...feed, ...data.feed]);
  }, [data]);
  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <h1>Hello there!</h1>
      <p>Check out this awesome newsfeed. Or not, you decide 🤷</p>
      {error ? (
        <div>
          <h2>Something went wrong</h2>
          <p>
            <b>Message:</b>
            <br /> {error.message}
          </p>
          <p>
            <b>Stack Trace:</b>
            <br /> {error.stack}
          </p>
        </div>
      ) : (
        <FeedComponent
          feed={feed}
          fetchMore={() =>
            setFeedArgs({
              ...feedArgs,
              offset: feedArgs.offset + PAGE_SIZE
            })
          }
          hasMore={!data || data.feed.length > 0}
        />
      )}
    </Layout>
  );
}
