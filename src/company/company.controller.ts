import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.schema';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() data: Partial<Company>) {
    return this.companyService.create(data);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.companyService.verifyOtp(body.email, body.otp);
  }
  
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.companyService.login(body.email, body.password);
  }
  

}
