import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUrlDto } from './dtos/create-url.dto';
import { UpdateUrlDto } from './dtos/update-url.dto';
import { RedirectFilter } from './exceptions/redirect/redirect.filter';

@Controller('shorten')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  createUrl(@Body() createUrlDto: CreateUrlDto) {
    return this.appService.createUrl(createUrlDto.url);
  }

  @Patch()
  updateUrl(@Body() updateUrlDto: UpdateUrlDto) {
    return this.appService.updateUrl(updateUrlDto.shortUrl, updateUrlDto.url);
  }

  @Delete(':shortCode')
  deleteUrl(@Param('shortCode') shortCode: string) {
    return this.appService.deleteUrl(shortCode);
  }

  @Get(':shortCode')
  @UseFilters(RedirectFilter)
  getUrl(@Param('shortCode') shortCode: string) {
    return this.appService.findUrl(shortCode);
  }

  @Get(':shortCode/stats')
  getStats(@Param('shortCode') shortCode: string) {
    return this.appService.getStats(shortCode);
  }
}
