import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";



export class JwtCustomStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
      });
    }
  
    async validate(payload: {
      username: string;
      id: number;
      salt: string;
    }): Promise<User> {
      const { username, id, salt } = payload;
      const user = await this.repo.findOneBy({ id });
  
      if (!user) throw new UnauthorizedException();
      return user;
    }
  }