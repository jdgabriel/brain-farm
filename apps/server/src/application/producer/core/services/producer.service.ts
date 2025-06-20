import { Injectable } from '@nestjs/common';
import { Producer } from '@shared-modules/persistence/entity/producer.entity';
import { ProducerRepository } from '@shared-modules/persistence/repository/producer.repository';
import { rawString } from '@shared-modules/persistence/utils/search-param';
import {
  InputSearchProducer,
  InputUpdateProducer,
} from '../../http/dto/producer.dto';
import { ProducerConflict } from '../exceptions/producer-conflict.exception';
import { ProducerNotFound } from '../exceptions/producer-not-found.exception';

@Injectable()
export class ProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async create(data: InputUpdateProducer) {
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
        name: rawString(data.name),
        document: rawString(data.document),
      },
    });

    return producers;
  }

  async update(data: InputUpdateProducer, producerId: string) {
    const producerExists =
      await this.producerRepository.findOneById(producerId);

    if (!producerExists) {
      throw new ProducerNotFound();
    }

    if (data.document) {
      const existingWithSameDocument =
        await this.producerRepository.existsWithSameDocument(
          producerId,
          data.document,
        );

      if (existingWithSameDocument) {
        throw new ProducerConflict();
      }
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

    if (!producerExists) {
      throw new ProducerNotFound();
    }

    await this.producerRepository.softDelete(producerId);
  }
}
