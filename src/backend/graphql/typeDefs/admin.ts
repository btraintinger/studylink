/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class Admin {
  @Field((type) => ID)
  id!: number;

  @Field()
  user!: User;

  @Field((type) => Int)
  schoolId?: number;
}
