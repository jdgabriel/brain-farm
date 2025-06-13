import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const FarmCropNotFoundData = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'FarmCrop not found, check if farmcrop id is valid',
  code: 'FARMCROP_NOT_FOUND',
} as const;

export class FarmCropNotFound extends ConflictException {
  constructor() {
    super(FarmCropNotFoundData);
  }
}

export class FarmCropNotFoundResponse {
  @ApiProperty({ example: FarmCropNotFoundData.statusCode })
  statusCode = FarmCropNotFoundData.statusCode;

  @ApiProperty({ example: FarmCropNotFoundData.message })
  message = FarmCropNotFoundData.message;

  @ApiProperty({ example: FarmCropNotFoundData.code })
  code = FarmCropNotFoundData.code;
}
