import { CultivationStatus } from '@application/cultive/core/enum/cultivation.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { Harvest } from './harvest.entity';

@Entity({ name: 'cultivations' })
export class Cultivation extends DefaultEntity<Cultivation> {
  @Column({ length: 50 })
  culture: string;

  @Column({ type: 'float' })
  area: number;

  @Column({ type: 'timestamptz' })
  plantingDate: Date;

  @Column({ type: 'timestamptz' })
  expectedHarvestDate: Date;

  @Column({
    type: 'enum',
    enum: CultivationStatus,
    default: CultivationStatus.PLOWING,
  })
  status: keyof typeof CultivationStatus;

  @Column({ type: 'uuid', nullable: false })
  harvestId: string;

  @ManyToOne(() => Harvest, (harvest) => harvest.crops)
  harvest: Harvest;

  constructor(data: Partial<Cultivation>) {
    super(data);
    Object.assign(this, data);
  }
}
