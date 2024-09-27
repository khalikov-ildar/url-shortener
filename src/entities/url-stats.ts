import { UUID, randomUUID } from 'crypto';
import { UrlEntity } from './url';

export class UrlStatsEntity extends UrlEntity {
  constructor(
    url: string,
    shortCode: string,
    updatedAt: Date = new Date(),
    public accessCount: number = 0,
    createdAt: Date = new Date(),
    public readonly id: UUID = randomUUID(),
  ) {
    super(url, shortCode, createdAt, updatedAt, id);
  }

  public updateUrl(url: string) {
    this.url = url;
    this.updatedAt = new Date();
  }

  public incrementCount(): void {
    this.accessCount += 1;
  }
}
