import { Project } from 'graphql/entities/project';
import { User } from 'graphql/entities/user';
import { ProjectService } from 'graphql/services/project-service';
import { UserService } from 'graphql/services/user-service';
import {
  Arg,
  FieldResolver,
  ID,
  Query,
  Resolver,
  ResolverInterface,
  Root
} from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(User)
export class UserResolver implements ResolverInterface<User> {
  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  @Query(() => User, { nullable: true })
  user(@Arg('id', () => ID) id: number) {
    return this.userService.findById(id);
  }

  @FieldResolver(() => [Project])
  projects(@Root() user: User) {
    return this.projectService.findByUserId(user.id);
  }
}
