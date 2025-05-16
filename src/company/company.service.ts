import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './company.schema';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) 
  private companyModel: Model<CompanyDocument>,
  private jwtService: JwtService,
  ) {}

  async create(data: Partial<Company>): Promise<Company> {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
  
    // Create company with the OTP
    const newCompany = new this.companyModel({ ...data, otp });
    return newCompany.save();
  }

  async verifyOtp(email: string, otp: string): Promise<{ message: string }> {
    // Find the company by email
    const company = await this.companyModel.findOne({ email }).exec();
  
    if (!company) {
      return { message: 'Company not found' };  // Company not found
    }
  
    // Check if the OTP matches
    if (company.otp === otp) {
      return { message: 'OTP is correct' };  // OTP is correct
    } else {
      return { message: 'OTP is not correct' };  // OTP is incorrect
    }
  }
  
  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const company = await this.companyModel.findOne({ email }).exec();
  
    if (!company) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    if (company.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const payload = { email: company.email, role: company.role };
    const accessToken = this.jwtService.sign(payload);
  
    return { accessToken };
  }  
  
}
