import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateAnimalDto {
//   @IsInt()
//   @IsNotEmpty()
//   id: number;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  species: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
