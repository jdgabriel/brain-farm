import { z } from 'zod';
import { DocumentType } from '../enum/document-type.enum';

export const ProducerPublicId = z.string().uuid();

export const Producer = z.object({
  id: ProducerPublicId,
  name: z.string(),
  document: z.string(),
  docType: z.nativeEnum(DocumentType),
});
export type Producer = z.infer<typeof Producer>;

export const ProducerDocument = z
  .string()
  .regex(
    /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/,
    'Document invalid, please use a valid CPF or CNPJ.',
  );

export const ProducerPublicInput = z.object({
  name: z.string().min(5),
  document: ProducerDocument,
  docType: z.nativeEnum(DocumentType),
});

export type ProducerPublicInput = z.infer<typeof ProducerPublicInput>;

export const ProducerPublicSearch = z.object({
  producerId: ProducerPublicId.optional(),
  name: z.string().min(1).optional(),
  document: z.string().min(1).optional(),
});
export type ProducerPublicSearch = z.infer<typeof ProducerPublicSearch>;
