import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [PersistenceModule.forRoot('in-memory')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
