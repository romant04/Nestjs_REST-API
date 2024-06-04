import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @IsOptional()
  readonly title: string;
  @IsString()
  @MaxLength(200)
  @IsOptional()
  readonly description: string;
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  @IsOptional()
  readonly done: boolean;
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  dueDate: Date;
}
