import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const FarmConflictData = {
  statusCode: HttpStatus.CONFLICT,
  message: 'Farm already exists',
  code: 'FARM_CONFLICT',
} as const;

export class FarmConflict extends ConflictException {
  constructor() {
    super(FarmConflictData);
  }
}

export class FarmConflictResponse {
  @ApiProperty({ example: FarmConflictData.statusCode })
  statusCode = FarmConflictData.statusCode;

  @ApiProperty({ example: FarmConflictData.message })
  message = FarmConflictData.message;

  @ApiProperty({ example: FarmConflictData.code })
  code = FarmConflictData.code;
}
