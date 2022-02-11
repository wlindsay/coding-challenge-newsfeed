import { IProject } from 'interfaces';
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
  created_ts: Date;

  @Field()
  updated_ts: Date;

  users: User[];
}
