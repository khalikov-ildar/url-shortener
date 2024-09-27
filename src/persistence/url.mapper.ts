import { UrlEntity } from 'src/entities/url';
import { UrlStatsEntity } from 'src/entities/url-stats';

export class UrlMapper {
  static withStatsToNoStats(withStats: UrlStatsEntity): UrlEntity {
    return new UrlEntity(
      withStats.url,
      withStats.shortCode,
      withStats.createdAt,
      withStats.updatedAt,
      withStats.id,
    );
  }
}
