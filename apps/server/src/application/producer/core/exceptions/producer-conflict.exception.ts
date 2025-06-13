import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const ProducerConflictData = {
  statusCode: HttpStatus.CONFLICT,
  message: 'Producer already exists',
  code: 'PRODUCER_CONFLICT',
} as const;

export class ProducerConflict extends ConflictException {
  constructor() {
    super(ProducerConflictData);
  }
}

export class ProducerConflictResponse {
  @ApiProperty({ example: ProducerConflictData.statusCode })
  statusCode = ProducerConflictData.statusCode;

  @ApiProperty({ example: ProducerConflictData.message })
  message = ProducerConflictData.message;

  @ApiProperty({ example: ProducerConflictData.code })
  code = ProducerConflictData.code;
}
