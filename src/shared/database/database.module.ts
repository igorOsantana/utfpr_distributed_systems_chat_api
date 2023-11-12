import { Module } from '@nestjs/common';
import { DatabaseServices } from './database.service';

@Module({
  providers: [DatabaseServices],
  exports: [DatabaseServices],
})
export class DatabaseModule {}
