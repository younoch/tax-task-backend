import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaxModule } from './modules/tax/tax.module';
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
    TaxModule,
    AuthModule,
    UserModule,
    PrismaModule
  ],
})
export class AppModule {}