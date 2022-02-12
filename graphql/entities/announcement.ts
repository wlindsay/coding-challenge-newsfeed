import { IAnnouncement } from 'interfaces';
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

  @Field()
  created_ts: Date;

  @Field()
  updated_ts: Date;
}
