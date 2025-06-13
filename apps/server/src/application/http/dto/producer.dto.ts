import { createZodDto } from 'nestjs-zod';
import { ProducerPublicInput } from '../../core/types/producer.type';

export class InputProducerDto extends createZodDto(ProducerPublicInput) {}
