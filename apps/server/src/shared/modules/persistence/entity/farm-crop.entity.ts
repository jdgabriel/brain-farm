import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../entity/default.entity';
import { Harvest } from './harvest.entity';

@Entity({ name: 'farm-crops' })
export class FarmCrop extends DefaultEntity<FarmCrop> {
  @Column({ length: 50 })
  culture: string;

  @Column({ type: 'uuid', nullable: false })
  harvestId: string;

  @ManyToOne(() => Harvest, (harvest) => harvest.crops)
  harvest: Harvest;

  constructor(data: Partial<FarmCrop>) {
    super(data);
    Object.assign(this, data);
  }
}
