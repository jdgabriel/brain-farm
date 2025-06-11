import { DefaultEntity } from '@internal-modules/persistence';
import { Column, Entity, OneToMany } from 'typeorm';
import { FarmCrop } from './farm-crop.entity';

@Entity()
export class Harvest extends DefaultEntity<Harvest> {
  @Column()
  name: string; // Ex: "Safra 2021"

  @OneToMany(() => FarmCrop, (farmCrop) => farmCrop.harvest)
  crops: FarmCrop[];
}
