import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IRepository,
  REPOSITORY_TOKEN,
} from './persistence/repository/i-repository';
import { randomBytes } from 'node:crypto';
import { promisify } from 'node:util';
import { UrlStatsEntity } from './entities/url-stats';
import { UrlMapper } from './persistence/url.mapper';
import { UrlEntity } from './entities/url';
import { RedirectException } from './exceptions/redirect/redirect.exception';

const promisifiedRandomBytes = promisify(randomBytes);

@Injectable()
export class AppService {
  constructor(
    @Inject(REPOSITORY_TOKEN) private readonly _urlRepository: IRepository,
  ) {}

  async createUrl(url: string): Promise<UrlEntity> {
    const isDuplicate = this._urlRepository.findOne(url);
    if (isDuplicate) {
      throw new ConflictException('This URL have been shorten already');
    }

    const shortCode = (await promisifiedRandomBytes(10)).toString('hex');
    const urlWithStats = new UrlStatsEntity(url, shortCode);

    this._urlRepository.create(urlWithStats);

    return UrlMapper.withStatsToNoStats(urlWithStats);
  }

  async findUrl(shortCode: string): Promise<UrlEntity> {
    const isFound = await this._urlRepository.findOne(shortCode);
    if (!isFound) {
      throw new NotFoundException();
    }
    await this.updateUrl;
    throw new RedirectException(isFound.url);
  }

  async updateUrl(shortCode: string, url: string): Promise<UrlEntity> {
    const isFound = this._urlRepository.findOne(shortCode);
    if (!isFound) {
      throw new NotFoundException();
    }
    const urlWithStats = await this._urlRepository.updateOne(shortCode, url);
    return UrlMapper.withStatsToNoStats(urlWithStats);
  }

  async deleteUrl(shortCode: string): Promise<void> {
    const isFound = this._urlRepository.findOne(shortCode);
    if (!isFound) {
      throw new NotFoundException();
    }
    return this._urlRepository.deleteOne(shortCode);
  }

  async getStats(shortCode: string): Promise<UrlStatsEntity> {
    return await this._urlRepository.findOne(shortCode);
  }
}
