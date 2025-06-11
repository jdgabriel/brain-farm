import { DefaultEntity } from '@internal-modules/persistence';
import { Column, Entity, OneToMany } from 'typeorm';
import { Farm } from './farm.entity';

@Entity({ name: 'producers' })
export class Producer extends DefaultEntity<Producer> {
  @Column({ unique: true })
  document: string;

  @Column()
  name: string;

  @OneToMany(() => Farm, (farm) => farm.producer)
  farms: Farm[];
}
