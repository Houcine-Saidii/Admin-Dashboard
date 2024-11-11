import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Day } from './entities/day.entity';
import { Zone } from './entities/zone.entity';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(Day)
    private dayRepository: Repository<Day>,
    @InjectRepository(Zone)
    private zoneRepository: Repository<Zone>,
  ) {}

  async create(day: Day): Promise<Day> {
    return this.dayRepository.save(day);
  }

  async findAll(): Promise<Day[]> {
    return this.dayRepository.find({ relations: ['zones'] });
  }

  async findOne(id: number): Promise<Day> {
    return this.dayRepository.findOne({
      where: { id },
      relations: ['zones'],
    });
  }

  async update(id: number, day: Partial<Day>): Promise<void> {
    await this.dayRepository.update(id, day);
  }

  async remove(id: number): Promise<void> {
    await this.dayRepository.delete(id);
  }
}
