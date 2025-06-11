import { DefaultEntity } from '@internal-modules/persistence';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Farm } from './farm.entity';
import { Harvest } from './harvest.entity';

@Entity({ name: 'farm-crops' })
export class FarmCrop extends DefaultEntity<FarmCrop> {
  @ManyToOne(() => Farm, (farm) => farm.crops)
  farm: Farm;

  @ManyToOne(() => Harvest, (harvest) => harvest.crops)
  harvest: Harvest;

  @Column()
  culture: string;
}
