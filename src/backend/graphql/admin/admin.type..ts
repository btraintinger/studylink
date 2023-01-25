/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { User } from '../user/user.type';

@ObjectType()
export class Admin {
  @Field((type) => ID)
  id!: number;

  @Field()
  user!: User;

  @Field((type) => Int)
  schoolId!: number;
}
