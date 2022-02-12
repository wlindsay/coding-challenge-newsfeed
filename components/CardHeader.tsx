import { FeedType } from 'interfaces';
import React from 'react';
import moment from 'moment';

type Props = {
  item: { type: FeedType; created_ts: string };
};

const CardHeader: React.FC<Props> = ({ item }) => (
  <div>
    <small>
      <b>{item.type}</b> |{' '}
      {moment(item.created_ts).format('MMMM Do YYYY, h:mm a')}
    </small>
  </div>
);

export default CardHeader;
