import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string;
  @IsString()
  @MaxLength(200)
  readonly description: string;
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  readonly done: boolean;
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dueDate: Date;
}
