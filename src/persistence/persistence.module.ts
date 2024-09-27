import { DynamicModule, Module } from '@nestjs/common';
import { REPOSITORY_TOKEN } from './repository/i-repository';
import { InMemoryRepository } from './repository/in-memory.repository';
import { OrmRepository } from './repository/orm.repository';

@Module({})
export class PersistenceModule {
  static forRoot(option: 'in-memory' | 'orm'): DynamicModule {
    return {
      module: PersistenceModule,
      providers: [
        {
          provide: REPOSITORY_TOKEN,
          useClass: option === 'in-memory' ? InMemoryRepository : OrmRepository,
        },
      ],
      exports: [REPOSITORY_TOKEN],
    };
  }
}
