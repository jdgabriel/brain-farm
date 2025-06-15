import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const CultivationConflictData = {
  statusCode: HttpStatus.CONFLICT,
  message: 'Cultivation already exists',
  code: 'FARMCROP_CONFLICT',
} as const;

export class CultivationConflict extends ConflictException {
  constructor() {
    super(CultivationConflictData);
  }
}

export class CultivationConflictResponse {
  @ApiProperty({ example: CultivationConflictData.statusCode })
  statusCode = CultivationConflictData.statusCode;

  @ApiProperty({ example: CultivationConflictData.message })
  message = CultivationConflictData.message;

  @ApiProperty({ example: CultivationConflictData.code })
  code = CultivationConflictData.code;
}
