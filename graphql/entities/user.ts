import { IUser } from 'interfaces';
import { UserFellowship } from 'interfaces/fellowship';
import { ObjectType, Field, ID } from 'type-graphql';
import { Project } from './project';

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  bio: string;

  @Field()
  avatar_url: string;

  @Field(() => String, {
    description: 'One of founders, angels, or writers'
  })
  fellowship: UserFellowship;

  @Field()
  created_ts: Date;

  @Field()
  updated_ts: Date;

  projects: Project[];
}
