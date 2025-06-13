import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const HarvestNotFoundData = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'Harvest not found, check if id is valid',
  code: 'HARVEST_NOT_FOUND',
} as const;

export class HarvestNotFound extends ConflictException {
  constructor() {
    super(HarvestNotFoundData);
  }
}

export class HarvestNotFoundResponse {
  @ApiProperty({ example: HarvestNotFoundData.statusCode })
  statusCode = HarvestNotFoundData.statusCode;

  @ApiProperty({ example: HarvestNotFoundData.message })
  message = HarvestNotFoundData.message;

  @ApiProperty({ example: HarvestNotFoundData.code })
  code = HarvestNotFoundData.code;
}
