import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  public readonly phone: string;
}
