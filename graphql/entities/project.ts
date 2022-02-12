import { FeedType, IProject } from 'interfaces';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class Project implements IProject {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  icon_url: string;

  @Field()
  created_ts: string;

  @Field()
  updated_ts: string;

  @Field(() => String)
  type: FeedType = 'Project';

  users: User[];
}
