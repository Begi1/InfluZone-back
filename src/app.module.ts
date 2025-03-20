import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfluencerModule } from './influencer/influencer.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://giorgibegii:ebn4L1VbjPPHxW55@test.6kluo.mongodb.net/'),
    InfluencerModule,
    CompanyModule,
  ],
})
export class AppModule {}
