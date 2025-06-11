import { DefaultEntity } from '@internal-modules/persistence';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { FarmCrop } from './farm-crop.entity';
import { Producer } from './producer.entity';

@Entity({ name: 'farms' })
export class Farm extends DefaultEntity<Farm> {
  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('float')
  totalArea: number;

  @Column('float')
  arableArea: number;

  @Column('float')
  vegetationArea: number;

  @ManyToOne(() => Producer, (producer) => producer.farms)
  @JoinColumn()
  producer: Producer;

  @OneToMany(() => FarmCrop, (farmCrop) => farmCrop.farm)
  crops: FarmCrop[];

  @BeforeInsert()
  @BeforeUpdate()
  validateAreas() {
    if (this.arableArea + this.vegetationArea > this.totalArea) {
      throw new Error(
        'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total.',
      );
    }
  }
}
