import { createZodDto } from 'nestjs-zod';
import {
  Producer,
  ProducerPublicInput,
  ProducerPublicSearch,
} from '../../core/types/producer.type';

export class InputProducer extends createZodDto(ProducerPublicInput) {}

export class InputUpdateProducer extends createZodDto(
  ProducerPublicInput.partial(),
) {}

export class InputSearchProducerId extends createZodDto(
  ProducerPublicSearch.pick({ producerId: true }),
) {}

export class InputSearchProducer extends createZodDto(ProducerPublicSearch) {}

export class OutputProducer extends createZodDto(Producer) {}
