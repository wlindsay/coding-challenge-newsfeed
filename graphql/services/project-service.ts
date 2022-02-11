import { plainToInstance } from 'class-transformer';
import db from 'graphql/db';
import { Project } from 'graphql/entities/project';
import { IProjectRow } from 'interfaces';
import { Service } from 'typedi';

@Service()
export class ProjectService {
  async findById(id: number): Promise<Project | undefined> {
    const project: IProjectRow | undefined = await db.getOne(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );
    if (!project) {
      throw new Error(`Project ${id} not found`);
    }
    return plainToInstance(Project, project);
  }

  async findByUserId(userId: number): Promise<Project[]> {
    const projects: IProjectRow[] = await db.getAll(
      `
        SELECT p.*
        FROM user_projects up
        JOIN projects p ON up.project_id = p.id
        WHERE up.user_id = ?
      `,
      [userId]
    );
    return plainToInstance(Project, projects);
  }
}
