/**
 * @author: William Lindsay
 * © Allswealth 2022
 */
import { Max, Min } from 'class-validator';
import { IUserArgs } from 'interfaces';
import { Field, ArgsType, Int } from 'type-graphql';

@ArgsType()
export class UserArgs implements IUserArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(100)
  take = 25;
}
