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
@Resolver(() => Project)
export class ProjectResolver implements ResolverInterface<Project> {
  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  @Query(() => Project, { nullable: true })
  project(@Arg('id', () => ID) id: number) {
    return this.projectService.findById(id);
  }

  @FieldResolver(() => [User])
  async users(@Root() project: Project) {
    const x = await this.userService.findByProjectId(project.id);
    return x;
  }
}
