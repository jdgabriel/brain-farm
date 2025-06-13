import { Injectable } from '@nestjs/common';
import { Farm } from 'src/application/persistence/entity/farm.entity';
import { ProducerRepository } from 'src/application/persistence/repository/producer.repository';
import { InputProducerDto } from '../../http/dto/producer.dto';
import { Producer } from '../../persistence/entity/producer.entity';
import { ProducerConflict } from '../exceptions/producer-conflict.exception';

@Injectable()
export class ProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async createProducer(data: InputProducerDto) {
    const producerExists = await this.producerRepository.existsBy({
      document: data.document,
    });

    if (producerExists) {
      throw new ProducerConflict();
    }

    const producer = new Producer({
      name: data.name,
      document: data.document,
      docType: data.docType,
    });

    if (data.farms) {
      producer.farms = data.farms.map((farm) => new Farm(farm));
    }

    await this.producerRepository.save(producer);

    return producer;
  }
}
