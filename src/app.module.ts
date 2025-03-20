import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { InfluencerModule } from './influencer/influencer.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI), 
    InfluencerModule,
    CompanyModule,
  ],
})
export class AppModule {}
