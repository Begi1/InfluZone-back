import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import * as sgMail from '@sendgrid/mail';
import { Influencer } from './influencer.schema';
import * as bcrypt from 'bcryptjs'; // bcryptjs for password hashing
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class InfluencerService {
  constructor(
    @InjectModel(Influencer.name) private influencerModel: Model<Influencer>,
    private jwtService: JwtService,  // Inject JwtService
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API key
  }

  async create(data: Partial<Influencer>): Promise<Influencer> {
    // Check if the email is already taken
    const existingInfluencer = await this.influencerModel.findOne({ email: data.email });
    
    if (existingInfluencer) {
      throw new Error('Email is already registered');
    }
  
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
  
    // Create influencer without sending email
    const newInfluencer = new this.influencerModel({ ...data, otp });
  
    return newInfluencer.save();
  }
  

  async verifyOtp(email: string, otp: string): Promise<{ message: string }> {
    // Find the influencer by email
    const influencer = await this.influencerModel.findOne({ email }).exec();

    if (!influencer) {
      return { message: 'User not found' };  // User not found
    }

    // Check if the OTP matches
    if (influencer.otp === otp) {
      return { message: 'OTP is correct' };  // OTP is correct
    } else {
      return { message: 'OTP is not correct' };  // OTP is incorrect
    }
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
  
    const influencer = await this.influencerModel.findOne({ email }).exec();
  
    if (!influencer) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    if (influencer.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const payload = { email: influencer.email };
    const accessToken = this.jwtService.sign(payload);
  
    return { accessToken };
  }
  
  async findAll(): Promise<Influencer[]> {
    return this.influencerModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<Influencer> {
    return this.influencerModel.findOne({ email }).exec();
  }

  async update(id: string, data: Partial<Influencer>): Promise<Influencer> {
    return this.influencerModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Influencer> {
    return this.influencerModel.findByIdAndDelete(id).exec();
  }

  private async sendOtpEmail(email: string, otp: string): Promise<boolean> {
    const msg = {
      to: email,
      from: 'giorgibegii@gmail.com', // Use your verified SendGrid sender email
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP code is: <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    };

    try {
      await sgMail.send(msg);
      console.log(`OTP sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return false;
    }
  }

  async updateProfileByEmail(email: string, updateData: any) {
    return this.influencerModel.findOneAndUpdate(
      { email }, // Find by email
      { $set: updateData }, // Update the fields
      { new: true } // Return the updated document
    );
  }
  
  async findLatestInfluencers(): Promise<Influencer[]> {
    return this.influencerModel.find().sort({ _id: -1 }).limit(6).exec();
  }
  
}
