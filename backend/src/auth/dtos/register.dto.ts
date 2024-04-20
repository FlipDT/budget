import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}