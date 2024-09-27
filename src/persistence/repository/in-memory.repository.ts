import { IRepository } from './i-repository';
import { UrlStatsEntity } from 'src/entities/url-stats';

export class InMemoryRepository implements IRepository {
  private readonly _urls: UrlStatsEntity[] = [];

  create(url: UrlStatsEntity): void | Promise<void> {
    this._urls.push(url);
  }

  deleteOne(shortCode: string): void | Promise<void> {
    const index = this._urls.findIndex((el) => el.shortCode === shortCode);
    this._urls.slice(index, 1);
  }

  findOne(shortCode: string): UrlStatsEntity | Promise<UrlStatsEntity> {
    return this._urls.find((el) => el.shortCode === shortCode);
  }

  updateOne(
    shortCode: string,
    url: string,
  ): UrlStatsEntity | Promise<UrlStatsEntity> {
    const urlIndex = this._urls.findIndex((el) => el.shortCode === shortCode);
    this._urls[urlIndex].updateUrl(url);
    return this._urls[urlIndex];
  }
}
