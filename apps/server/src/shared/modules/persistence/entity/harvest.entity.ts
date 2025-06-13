import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { FarmCrop } from './farm-crop.entity';
import { Farm } from './farm.entity';

@Entity()
export class Harvest extends DefaultEntity<Harvest> {
  @Column({ length: 25 })
  name: string;

  @OneToMany(() => FarmCrop, (farmCrop) => farmCrop.harvest)
  crops: FarmCrop[];

  @ManyToOne(() => Farm, (farm) => farm.harvests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'farmId', referencedColumnName: 'id' })
  farm: Farm;

  @Column({ type: 'uuid', nullable: false })
  farmId: string;

  constructor(data: Partial<Harvest>) {
    super(data);
    Object.assign(this, data);
  }
}
