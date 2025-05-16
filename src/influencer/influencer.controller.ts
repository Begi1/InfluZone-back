import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException, Patch } from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { Influencer } from './influencer.schema';

@Controller('influencers')
export class InfluencerController {
  constructor(private readonly influencerService: InfluencerService) {}

  @Post()
  async create(@Body() data: Partial<Influencer>) {
    try {
      const influencer = await this.influencerService.create(data);
      return influencer;
    } catch (error) {
      if (error.message === 'Email is already registered') {
        throw new BadRequestException('Email is already registered');
      }
      throw error;  // Rethrow other unexpected errors
    }
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.influencerService.verifyOtp(body.email, body.otp);
  }
  
  @Get()
  async findAll() {
    return this.influencerService.findAll();
  }

  @Get('latest')
  async findLatestInfluencers() {
    return this.influencerService.findLatestInfluencers();
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    return this.influencerService.findOneByEmail(email);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Influencer>) {
    return this.influencerService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.influencerService.delete(id);
  }

  @Patch('update-profile/:email')
  async updateProfileByEmail(
    @Param('email') email: string,
    @Body() body: {
      socialMedia?: { title: string; url: string }[];
      image?: string;
      about?: string;
      content?: any[];
      topThreeVideo?: any[];
    }
  ) {
    return this.influencerService.updateProfileByEmail(email, body);
  }

  
}