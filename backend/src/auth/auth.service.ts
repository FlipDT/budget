import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';




@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const foundUser = await this.repo.findOneBy({
      username: registerDto.username,
    });

if (foundUser) {
        throw new UnauthorizedException('Invalid Credentials.');
      }
      const { username, password } = registerDto;
      const salt = await bcrypt.genSalt();
      const createdDate = new Date();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.repo.create({
        username,
        password: hashedPassword,
        salt,
        createdDate
      });
      const newUser = await this.repo.save(user);
      delete newUser.password;
      delete newUser.salt;
      return newUser;
    }

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;
    
        const user = this.repo.findOneBy({ username });
    
        if (!user) {
          throw new UnauthorizedException('Invalid Credentials.');
        }
    
        const salt = (await user).salt;
        const isPasswordMatch = await bcrypt.compare(
          password,
          (await user).password,
        );
    
        if (isPasswordMatch) {
          const payload = { username, id: (await user).id, salt };
          return { access_token: this.jwtService.sign(payload) };
        } else {
          throw new UnauthorizedException('Invalid Credentials.');
        }
      }
    }
    