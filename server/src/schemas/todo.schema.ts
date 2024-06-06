import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class Todo {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop()
  description: string;
  @Prop({ required: false, default: false })
  done: boolean;
  @Prop({ type: Date, required: false, default: new Date() })
  dueDate: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
