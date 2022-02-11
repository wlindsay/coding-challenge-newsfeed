import { plainToInstance } from 'class-transformer';
import db from 'graphql/db';
import { User } from 'graphql/entities/user';
import { IUserRow } from 'interfaces';
import { Service } from 'typedi';

@Service()
export class UserService {
  async findById(id: number): Promise<User | undefined> {
    const user: IUserRow | undefined = await db.getOne(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    return plainToInstance(User, user);
  }

  async findByProjectId(projectId: number): Promise<User[]> {
    const users: IUserRow[] = await db.getAll(
      `
        SELECT u.*
        FROM user_projects up
        JOIN users u ON up.user_id = u.id
        WHERE up.project_id = ?
      `,
      [projectId]
    );
    return plainToInstance(User, users);
  }
}
