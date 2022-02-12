/**
 * @author: William Lindsay
 * © Allswealth 2022
 */
import { IsBoolean, IsIn, IsOptional, Max, Min } from 'class-validator';
import { IFeedArgs } from 'interfaces';
import { AllFellowship } from 'interfaces/fellowship';
import { Field, ArgsType, Int } from 'type-graphql';

@ArgsType()
export class FeedArgs implements IFeedArgs {
  @Field(() => String, {
    description: 'One of founders, angels, writers, or all'
  })
  @IsIn(['all', 'founders', 'angels', 'writers'])
  fellowship: AllFellowship = 'all';

  @Field(() => Int)
  @Min(0)
  offset = 0;

  @Field(() => Int)
  @Min(1)
  @Max(100)
  limit = 10;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  orderDescending?: boolean;
}
