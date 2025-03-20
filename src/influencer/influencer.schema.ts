import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Influencer extends Document {

  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  date: string;

  @Prop({
    type: [
      {
        title: { type: String },
        username: { type: String },
        url: { type: String },
        about: { type: String},
        image: { type: String },
      },
    ],
    default: [],
  })
  socialMedia: { title: string; url: string }[];

  @Prop({ type: Array, default: [] })
  content: any[];

  @Prop({ type: Array, default: [] })
  topThreeVideo: any[];

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

export const InfluencerSchema = SchemaFactory.createForClass(Influencer);
