import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamMemberDocument = TeamMember & Document;

@Schema()
export class TeamMember {
  _id: string;

  @Prop()
  firstName: string;

  @Prop()
  position: string;

  @Prop()
  about: string;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
