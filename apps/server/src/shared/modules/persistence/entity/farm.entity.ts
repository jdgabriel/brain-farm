import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
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
  @JoinColumn({
    name: 'producerId',
    referencedColumnName: 'id',
  })
  producer: Producer;

  @Column({ type: 'uuid', nullable: false })
  producerId: string;

  @OneToMany(() => FarmCrop, (farmCrop) => farmCrop.farm)
  crops: FarmCrop[];

  constructor(data: Partial<Farm>) {
    super(data);
    Object.assign(this, data);
  }
}
