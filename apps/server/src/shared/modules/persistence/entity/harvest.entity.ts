import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { FarmCrop } from './farm-crop.entity';

@Entity()
export class Harvest extends DefaultEntity<Harvest> {
  @Column({ length: 25 })
  name: string;

  @OneToMany(() => FarmCrop, (farmCrop) => farmCrop.harvest)
  crops: FarmCrop[];

  constructor(data: Partial<Harvest>) {
    super(data);
    Object.assign(this, data);
  }
}
