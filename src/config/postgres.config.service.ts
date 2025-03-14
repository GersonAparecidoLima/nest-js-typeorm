import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {

    //Configuração de variáveis de ambiente parece estar correta
    //console.log('DB_HOST:', this.configService.get<string>('DB_HOST'));
    //console.log('DB_PORT:', this.configService.get<number>('DB_PORT'));
    //console.log('DB_USERNAME:', this.configService.get<string>('DB_USERNAME'));
    //console.log('DB_PASSWORD:', this.configService.get<string>('DB_PASSWORD'));
    //console.log('DB_NAME:', this.configService.get<string>('DB_NAME'));


    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',  // Suporta arquivos .ts para dev e .js para prod
      ],
      synchronize: true,
    };
  }
}
