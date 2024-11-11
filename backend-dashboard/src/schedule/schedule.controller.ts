// src/days/days.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DaysService } from './schedule.service';
import { Day } from './entities/day.entity';

@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}

  @Post()
  create(@Body() createDayDto: Day) {
    return this.daysService.create(createDayDto);
  }

  @Get()
  findAll() {
    return this.daysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.daysService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDayDto: Day) {
    return this.daysService.update(+id, updateDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daysService.remove(+id);
  }
}
