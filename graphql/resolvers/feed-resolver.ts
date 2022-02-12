import { FeedArgs } from 'graphql/args/feed-args';
import { Announcement } from 'graphql/entities/announcement';
import { Project } from 'graphql/entities/project';
import { User } from 'graphql/entities/user';
import { FeedService } from 'graphql/services/feed-service';
import { FeedType } from 'interfaces';
import { Args, createUnionType, Info, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

const FeedResultUnion = createUnionType({
  name: 'FeedResult',
  types: () => [Project, User, Announcement] as const,
  resolveType: value => {
    switch (value.type) {
      case 'Project':
        return Project;
      case 'User':
        return User;
      case 'Announcement':
        return Announcement;
      default:
        return undefined;
    }
  }
});

interface IInfoNode {
  name: {
    value: string;
  };
  typeCondition: {
    name: { value: string };
  };
  selectionSet: {
    selections: IInfoNode[];
  };
}

interface IInfo {
  fieldNodes: IInfoNode[];
}

@Service()
@Resolver()
export class FeedResolver {
  constructor(private feedService: FeedService) {}

  @Query(() => [FeedResultUnion])
  feed(
    @Args() args: FeedArgs,
    @Info() info: IInfo
  ): Promise<Array<typeof FeedResultUnion>> {
    const filter = this.getFilter(info);
    return this.feedService.find(args, filter);
  }

  private getFilter(info: IInfo): FeedType[] {
    if (!info.fieldNodes[0]) {
      return [];
    }

    return info.fieldNodes[0].selectionSet.selections
      .map(s => {
        if (!s.typeCondition) {
          return;
        }
        return s.typeCondition.name.value;
      })
      .filter(x => x) as FeedType[];
  }
}
