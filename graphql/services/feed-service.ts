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
      SELECT
        p.id, p.name, p.description, p.icon_url, p.created_ts, p.updated_ts,
        '' as bio, '' as avatar_url, '' as fellowship,
        '' as title, '' as body,
        'Project' as type
      FROM projects p
    `;
  }

  private getUserQuery(fellowship: AllFellowship): string | undefined {
    const baseQuery = `
      SELECT
        u.id, u.name, '' as description, '' as icon_url, u.created_ts, u.updated_ts,
        u.bio, u.avatar_url, u.fellowship,
        '' as title, '' as body,
        'User' as type
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
      SELECT
        a.id, '' as name, '' as description, '' as icon_urls, a.created_ts, a.updated_ts,
        '' as bio, '' as avatar_url, a.fellowship,
        a.title, a.body,
        'Announcement' as type
      FROM announcements a
    `;
    if (fellowship === 'all') {
      return baseQuery;
    } else {
      return `${baseQuery} WHERE a.fellowship IN ('${fellowship}', 'all')`;
    }
  }
}
