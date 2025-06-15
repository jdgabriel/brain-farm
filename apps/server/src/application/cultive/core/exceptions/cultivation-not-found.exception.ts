import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const CultivationNotFoundData = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'Cultivation not found, check if farmcrop id is valid',
  code: 'FARMCROP_NOT_FOUND',
} as const;

export class CultivationNotFound extends ConflictException {
  constructor() {
    super(CultivationNotFoundData);
  }
}

export class CultivationNotFoundResponse {
  @ApiProperty({ example: CultivationNotFoundData.statusCode })
  statusCode = CultivationNotFoundData.statusCode;

  @ApiProperty({ example: CultivationNotFoundData.message })
  message = CultivationNotFoundData.message;

  @ApiProperty({ example: CultivationNotFoundData.code })
  code = CultivationNotFoundData.code;
}
