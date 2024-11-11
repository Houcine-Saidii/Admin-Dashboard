// src/days/entities/zone.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Day } from './day.entity';

@Entity()
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  heureOuverture: string;

  @Column()
  heureFermeture: string;

  @Column()
  isOpen: boolean;

  @ManyToOne(() => Day, (day) => day.zones)
  day: Day;
}
