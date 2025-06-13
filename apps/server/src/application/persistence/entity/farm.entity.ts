import { DefaultEntity } from '@shared-modules/persistence';
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
  @Column({ length: 100 })
  name: string;

  @Column({ length: 150 })
  city: string;

  @Column({ length: 75 })
  state: string;

  @Column({ type: 'float' })
  totalArea: number;

  @Column({ type: 'float' })
  arableArea: number;

  @Column({ type: 'float' })
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

  constructor(data: Partial<Farm>) {
    super(data);
    Object.assign(this, data);
  }
}
