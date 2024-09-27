import { IsString, IsUrl } from 'class-validator';

export class UpdateUrlDto {
  @IsUrl()
  url: string;

  @IsString()
  shortUrl: string;
}
