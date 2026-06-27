import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaxModule } from './modules/tax/tax.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TaxModule
  ],
})
export class AppModule {}