import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
        createTypeOrmOptions(): TypeOrmModuleOptions {
            return {
                type: 'postgres',
                username: this.configService.get<string>('POSTGRES_USE'),      password: this.configService.get<string>('POSTGRES_PASSWORD'),
                database: this.configService.get<string>('POSTGRES_DB'),
                port: this.configService.get<number>('POSTGRES_PORT'),
                entities: [User, Category, Operation],
                synchronize: true
            };
        }
    
}