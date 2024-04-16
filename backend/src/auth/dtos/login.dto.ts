import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(12)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre'
    })
    password: string;
}