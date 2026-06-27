import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaxModule } from './modules/tax/tax.module';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TaxModule,
    AuthModule
  ],
})
export class AppModule {}