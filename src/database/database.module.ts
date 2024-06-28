import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get('MYSQL_URL'),
        autoLoadEntities: true,
        synchronize: false,

        //* Development
        // host: configService.getOrThrow('MYSQL_HOST'),
        // port: parseInt(configService.getOrThrow('MYSQL_PORT')),
        // database: configService.getOrThrow('MYSQL_DATABASE'),
        // username: configService.getOrThrow('MYSQL_USERNAME'),
        // password: configService.getOrThrow('MYSQL_PASSWORD'),
        // synchronize: configService.get('MYSQL_SYNCRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
