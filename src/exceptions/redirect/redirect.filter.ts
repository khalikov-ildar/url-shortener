import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RedirectException } from './redirect.exception';

@Catch()
export class RedirectFilter implements ExceptionFilter {
  catch(exception: RedirectException, host: ArgumentsHost) {
    host.switchToHttp().getResponse().redirect(exception.cause);
  }
}
