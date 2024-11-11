// schedule.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysService  } from './schedule.service';
import { DaysController } from './schedule.controller';
import { Day } from './entities/day.entity';
import { Zone } from './entities/zone.entity';

@Module({
 // imports: [TypeOrmModule.forFeature([Day, Zone])],
  providers: [DaysController],
  controllers: [DaysService],
})
export class ScheduleModule {}
