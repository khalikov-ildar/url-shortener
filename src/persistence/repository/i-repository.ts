import { UrlStatsEntity } from 'src/entities/url-stats';

export const REPOSITORY_TOKEN = Symbol('REPOSITORY_TOKEN');

export interface IRepository {
  findOne(shortCode: string): UrlStatsEntity | Promise<UrlStatsEntity>;
  create(url: UrlStatsEntity): void | Promise<void>;
  updateOne(
    shortCode: string,
    url: string,
  ): UrlStatsEntity | Promise<UrlStatsEntity>;
  deleteOne(shortCode: string): void | Promise<void>;
}
