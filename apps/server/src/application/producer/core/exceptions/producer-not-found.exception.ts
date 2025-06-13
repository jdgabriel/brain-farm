import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const ProducerNotFoundData = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'Producer not found, check if producer id is valid',
  code: 'PRODUCER_NOT_FOUND',
} as const;

export class ProducerNotFound extends ConflictException {
  constructor() {
    super(ProducerNotFoundData);
  }
}

export class ProducerNotFoundResponse {
  @ApiProperty({ example: ProducerNotFoundData.statusCode })
  statusCode = ProducerNotFoundData.statusCode;

  @ApiProperty({ example: ProducerNotFoundData.message })
  message = ProducerNotFoundData.message;

  @ApiProperty({ example: ProducerNotFoundData.code })
  code = ProducerNotFoundData.code;
}
