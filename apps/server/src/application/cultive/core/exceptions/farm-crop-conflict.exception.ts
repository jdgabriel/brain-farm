import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const FarmCropConflictData = {
  statusCode: HttpStatus.CONFLICT,
  message: 'FarmCrop already exists',
  code: 'FARMCROP_CONFLICT',
} as const;

export class FarmCropConflict extends ConflictException {
  constructor() {
    super(FarmCropConflictData);
  }
}

export class FarmCropConflictResponse {
  @ApiProperty({ example: FarmCropConflictData.statusCode })
  statusCode = FarmCropConflictData.statusCode;

  @ApiProperty({ example: FarmCropConflictData.message })
  message = FarmCropConflictData.message;

  @ApiProperty({ example: FarmCropConflictData.code })
  code = FarmCropConflictData.code;
}
