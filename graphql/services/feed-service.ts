import { FeedArgs } from 'graphql/args/feed-args';
import db from 'graphql/db';
import { FeedType, FeedRow } from 'interfaces';
import { AllFellowship } from 'interfaces/fellowship';
import { Service } from 'typedi';

@Service()
export class FeedService {
  async find(args: FeedArgs, filter: FeedType[]): Promise<FeedRow[]> {
    if (filter.length === 0) {
      return [];
    }

    return await db.getAll(
      `
        ${this.getItemQueries(filter, args.fellowship).join(`
          UNION ALL
        `)}
        ORDER BY created_ts ${!args.orderDescending ? 'ASC' : 'DESC'}
        LIMIT ${args.limit} OFFSET ${args.offset}
      `,
      []
    );
  }

  private getItemQueries(
    filter: FeedType[],
    fellowship: AllFellowship
  ): string[] {
    const queries = filter.map(f => {
      switch (f) {
        case 'Project':
          return this.getProjectQuery;
        case 'User':
          return this.getUserQuery;
        case 'Announcement':
          return this.getAnnouncementQuery;
        default:
          return undefined;
      }
    });

    return queries
      .map(q => (q ? q(fellowship) : undefined))
      .filter(x => x) as string[];
  }

  private getProjectQuery(fellowship: AllFellowship): string | undefined {
    if (fellowship === 'writers') {
      return;
    }
    return `
      SELECT p.*, '' as bio, '' as avatar_url, '' as fellowship, '' as title, '' as body, 'Project' as type
      FROM projects p
    `;
  }

  private getUserQuery(fellowship: AllFellowship): string | undefined {
    const baseQuery = `
      SELECT u.*, '' as description, '' as icon_url, '' as title, '' as body, 'User' as type
      FROM users u
    `;
    switch (fellowship) {
      case 'angels':
      case 'founders':
        return `${baseQuery} WHERE u.fellowship IN ('angels', 'founders')`;
      case 'writers':
        return `${baseQuery} WHERE u.fellowship = 'writers'`;
      case 'all':
      default:
        return baseQuery;
    }
  }

  private getAnnouncementQuery(fellowship: AllFellowship): string | undefined {
    const baseQuery = `
      SELECT a.*, '' as name, '' as bio, '' as avatar_url, '' as description, '' as icon_url, 'Announcement' as type
      FROM announcements a
    `;
    if (fellowship === 'all') {
      return baseQuery;
    } else {
      return `${baseQuery} WHERE a.fellowship IN ('${fellowship}', 'all')`;
    }
  }
}
