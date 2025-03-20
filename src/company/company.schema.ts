import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop()
  image: string;

  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  about: string;

  @Prop()
  requirements: string;

  @Prop()
  priceRange: string;

  @Prop({ type: Object })
  socialMedia: Record<string, any>;

  @Prop({ type: Array, default: [] })
  category: string[];

  @Prop({ type: Object })
  yourServices: Record<string, any>;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: 0 })
  cout: number;

  @Prop()
  dateOfCreation: string;

  @Prop()
  otp: string; 
}

export const CompanySchema = SchemaFactory.createForClass(Company);


