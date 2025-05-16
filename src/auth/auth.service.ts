import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Influencer } from '../influencer/influencer.schema'; // Import the influencer schema

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Influencer.name) private influencerModel: Model<Influencer>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ accessToken: string }> {
  
    const influencer = await this.influencerModel.findOne({ email }).exec();
  
    if (!influencer) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    if (influencer.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const payload = { email: influencer.email, role: influencer.role, socialVerify: influencer.socialVerify, name: influencer.name, 
                      lastname: influencer.lastname, date: influencer.date, dateOfCreation: influencer.dateOfCreation };
    const accessToken = this.jwtService.sign(payload);
      
    return { accessToken };
  }
}
