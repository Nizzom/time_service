import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IpPayload, ZonePayload } from 'src/interfaces/time';

export type Out_requestDocument = Out_request & Document;

@Schema()
export class Out_request {
  @Prop({ type: Object })
  payload: IpPayload | ZonePayload;
  @Prop({ type: String })
  version: string;
  @Prop({ type: String })
  id: string | number;
  @Prop({ type: String })
  method: string;
}
export const Out_requestSchema = SchemaFactory.createForClass(Out_request);
