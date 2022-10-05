import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  username: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty({
    required: true,
    enum: ['google', 'local']
  })
  provider: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty({
    minLength: 3,
    required: true,
    description: 'Password should include letters and numbers (In process)',
  })
  password?: string;
}
