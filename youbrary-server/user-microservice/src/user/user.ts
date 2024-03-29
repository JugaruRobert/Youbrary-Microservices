import { IsString } from 'class-validator';
import { Document } from 'mongoose';

export class User extends Document {
  @IsString() email: string;
  @IsString() password: string;
}