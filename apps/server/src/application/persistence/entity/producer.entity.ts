import { DefaultEntity } from '@shared-modules/persistence';
import { Column, Entity, OneToMany } from 'typeorm';
import { DocumentType } from '../../core/enum/document-type.enum';
import { Farm } from './farm.entity';

@Entity({ name: 'producers' })
export class Producer extends DefaultEntity<Producer> {
  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  document: string;

  @Column({ type: 'enum', enum: DocumentType })
  docType: DocumentType;

  @OneToMany(() => Farm, (farm) => farm.producer)
  farms: Farm[];

  constructor(data: Partial<Producer>) {
    super(data);
    Object.assign(this, data);
  }
}
