import { createZodDto } from 'nestjs-zod';
import {
  ProducerPublicInput,
  ProducerPublicSearch,
} from '../../core/types/producer.type';

export class InputProducerDto extends createZodDto(ProducerPublicInput) {}

export class UpdateProducerDto extends createZodDto(
  ProducerPublicInput.partial(),
) {}

export class InputSearchProducerId extends createZodDto(
  ProducerPublicSearch.pick({ producerId: true }),
) {}

export class InputSearchProducer extends createZodDto(ProducerPublicSearch) {}
