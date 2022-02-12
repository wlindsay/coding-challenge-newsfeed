import { FeedType, IAnnouncement } from 'interfaces';
import { AllFellowship } from 'interfaces/fellowship';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Announcement implements IAnnouncement {
  @Field(() => ID)
  id: number;

  @Field(() => String, {
    description: 'One of founders, angels, writers, or all'
  })
  fellowship: AllFellowship;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => String)
  type: FeedType = 'Announcement';

  @Field()
  created_ts: string;

  @Field()
  updated_ts: string;
}
