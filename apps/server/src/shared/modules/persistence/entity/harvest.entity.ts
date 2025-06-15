import { CultivationStatus } from '@application/cultive/core/enum/cultivation.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cultivation } from './cultivation.entity';
import { DefaultEntity } from './default.entity';
import { Farm } from './farm.entity';

@Entity()
export class Harvest extends DefaultEntity<Harvest> {
  @Column({ length: 25 })
  name: string;

  @Column({
    type: 'enum',
    enum: CultivationStatus,
    default: CultivationStatus.PLOWING,
  })
  status: keyof typeof CultivationStatus;

  @Column({ type: 'timestamptz', nullable: true })
  plantingDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  expectedHarvestDate: Date;

  @OneToMany(() => Cultivation, (cultivation) => cultivation.harvest)
  crops: Cultivation[];

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
