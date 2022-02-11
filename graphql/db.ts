import path from 'path';
import { Database } from 'sqlite3';

type DbParamType = string | number | Date | boolean;

class AsyncDatabase {
  db: Database;

  constructor(filename: string) {
    this.db = new Database(filename);
  }

  async getOne<T>(
    sql: string,
    params: DbParamType[] = []
  ): Promise<T | undefined> {
    const rows = await this.getAll<T>(sql, params);
    return rows[0];
  }

  async getAll<T>(sql: string, params: DbParamType[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare(sql);
      stmt.all(...params, (err: Error | undefined, rows: T[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export default new AsyncDatabase(path.join(process.cwd(), 'db.sqlite'));

export type UserProjectRow = {
  user_id: number;
  project_id: number;
};
