import { z } from 'zod';
import { DocumentType } from '../enum/document-type.enum';
import { FarmInput } from './farm.type';

export const ProducerPublicId = z.string().uuid();

export const Producer = z.object({
  id: ProducerPublicId,
  name: z.string(),
  document: z.string(),
  docType: z.nativeEnum(DocumentType),
  farms: z.array(FarmInput).optional(),
});
export type Producer = z.infer<typeof Producer>;

export const ProducerPublicInput = z.object({
  name: z.string().min(5),
  document: z
    .string()
    .regex(
      /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/,
      'Document invalid, please use a valid CPF or CNPJ.',
    ),
  docType: z.nativeEnum(DocumentType),
  farms: z.array(FarmInput).min(1).optional(),
});

export type ProducerPublicInput = z.infer<typeof ProducerPublicInput>;
