import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Todo } from './todo.schema';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: [Types.ObjectId], ref: 'Todo', default: [] })
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
