import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }

    const token = request.headers.authorization.split(' ')[1];

    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      request.user = decodedToken;
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}