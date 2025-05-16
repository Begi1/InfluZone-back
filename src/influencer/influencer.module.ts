import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Influencer, InfluencerSchema } from './influencer.schema';
import { InfluencerService } from './influencer.service';
import { InfluencerController } from './influencer.controller';
import { AuthModule } from 'src/auth/auth.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Influencer.name, schema: InfluencerSchema }]),
    AuthModule, 
  ],
  controllers: [InfluencerController],
  providers: [InfluencerService],
})
export class InfluencerModule {}
