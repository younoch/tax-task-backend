import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, Params } from 'nestjs-pino';
import { IncomingMessage, ServerResponse } from 'http';
import { ScheduleModule } from '@nestjs/schedule';

import { TaxTaskModule } from './modules/taxTask/taxTask.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { CleanupModule } from './modules/cleanup/cleanup.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

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

          serializers: {
            req(req: IncomingMessage) {
              return {
                method: req.method,
                url: req.url,
              };
            },
            res(res: ServerResponse) {
              return {
                statusCode: res.statusCode,
              };
            },
          },
          customSuccessMessage: (req, res) => {
            return `${req.method} ${req.url} ${res.statusCode}`;
          },
        },
      }),
    }),
    ScheduleModule.forRoot(),

    TaxTaskModule,
    AuthModule,
    UserModule,
    PrismaModule,
    HealthModule,
    CleanupModule,
  ],
})
export class AppModule {}
