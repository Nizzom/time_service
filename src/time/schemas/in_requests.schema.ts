import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type In_requestDocument = In_request & Document;

@Schema()
export class In_request {
  @Prop({ type: Object })
  headers: object;

  @Prop({ type: Object })
  body: object;
}
export const In_requestSchema = SchemaFactory.createForClass(In_request);
