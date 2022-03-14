import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;
}
