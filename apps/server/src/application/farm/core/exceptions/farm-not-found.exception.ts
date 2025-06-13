import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const FarmNotFoundData = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'Farm not found, check if farm id is valid',
  code: 'FARM_NOT_FOUND',
} as const;

export class FarmNotFound extends ConflictException {
  constructor() {
    super(FarmNotFoundData);
  }
}

export class FarmNotFoundResponse {
  @ApiProperty({ example: FarmNotFoundData.statusCode })
  statusCode = FarmNotFoundData.statusCode;

  @ApiProperty({ example: FarmNotFoundData.message })
  message = FarmNotFoundData.message;

  @ApiProperty({ example: FarmNotFoundData.code })
  code = FarmNotFoundData.code;
}
