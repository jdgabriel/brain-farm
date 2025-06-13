import { Injectable } from '@nestjs/common';
import { Farm } from '@shared-modules/persistence/entity/farm.entity';
import { Producer } from '@shared-modules/persistence/entity/producer.entity';
import { ProducerRepository } from '@shared-modules/persistence/repository/producer.repository';
import { Like, Raw } from 'typeorm';
import {
  InputSearchProducer,
  UpdateProducerDto,
} from '../../http/dto/producer.dto';
import { ProducerConflict } from '../exceptions/producer-conflict.exception';
import { ProducerNotFound } from '../exceptions/producer-not-found.exception';

@Injectable()
export class ProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async create(data: UpdateProducerDto) {
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

  async find(producerId: string) {
    const producer = await this.producerRepository.findOneById(producerId);

    if (!producer) {
      throw new ProducerNotFound();
    }
    return producer;
  }

  async fetch(data: InputSearchProducer) {
    const producers = await this.producerRepository.find({
      where: {
        id: data.producerId ?? undefined,
        name: data.name
          ? Raw(
              (alias) => `LOWER(${alias}) Like '%${data.name!.toLowerCase()}%'`,
            )
          : undefined,
        document: data.document ? Like(`%${data.document}%`) : undefined,
      },
    });

    return producers;
  }

  async update(data: UpdateProducerDto, producerId: string) {
    const producerExists =
      await this.producerRepository.findOneById(producerId);

    if (!producerExists) {
      throw new ProducerNotFound();
    }

    const producer = new Producer({
      id: producerId,
      name: data.name,
      document: data.document,
      docType: data.docType,
    });

    await this.producerRepository.save(producer);
    return producer;
  }

  async delete(producerId: string) {
    const producerExists =
      await this.producerRepository.findOneById(producerId);

    if (producerExists) {
      throw new ProducerNotFound();
    }

    await this.producerRepository.softDelete(producerId);
  }
}
