// src/days/entities/day.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Zone } from './zone.entity';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jour: string;

  @Column()
  etat: string;

  @Column({ nullable: true })
  heureouv: string;

  @Column({ nullable: true })
  heureferm: string;

  @Column()
  totalheure: string;

  @OneToMany(() => Zone, (zone) => zone.day, { cascade: true })
  zones: Zone[];
}
