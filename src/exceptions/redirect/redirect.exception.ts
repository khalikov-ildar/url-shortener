import { HttpException, HttpStatus } from '@nestjs/common';

export class RedirectException extends HttpException {
  constructor(url: string) {
    super('Redirecting to the requested URL', HttpStatus.FOUND, {
      cause: url,
    });
  }
}
