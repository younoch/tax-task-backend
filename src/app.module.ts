import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    TaxTaskModule,
    AuthModule,
    UserModule,
    PrismaModule,
  ],
})
export class AppModule {}
