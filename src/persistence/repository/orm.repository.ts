import { UrlStatsEntity } from 'src/entities/url-stats';
import { IRepository } from './i-repository';

export class OrmRepository implements IRepository {
  create(url: UrlStatsEntity): void | Promise<void> {
    url.id.split('');
  }

  deleteOne(shortCode: string): void | Promise<void> {
    shortCode.split('');
  }

  findOne(shortCode: string): UrlStatsEntity | Promise<UrlStatsEntity> {
    return new UrlStatsEntity('a', shortCode);
  }

  updateOne(
    shortCode: string,
    url: string,
  ): UrlStatsEntity | Promise<UrlStatsEntity> {
    return new UrlStatsEntity(url, shortCode);
  }
}
