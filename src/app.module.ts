import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Params } from 'nestjs-pino';

import { TaxTaskModule } from './modules/taxTask/taxTask.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

    // ✅ FIX: use forRootAsync + typed config
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Params => ({
        pinoHttp: {
          level: configService.get<string>('LOG_LEVEL') || 'info',

          transport:
            configService.get<string>('NODE_ENV') !== 'production'
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    translateTime: 'HH:MM:ss',
                    ignore: 'pid,hostname',
                    singleLine: true,
                  },
                }
              : undefined,

          autoLogging: true,
        },
      }),
    }),

    TaxTaskModule,
    AuthModule,
    UserModule,
    PrismaModule,
  ],
})
export class AppModule {}