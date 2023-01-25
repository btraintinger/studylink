/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  role!: string;
}

@InputType()
export class UserUpdateInput {
  @Field()
  email!: string;

  @Field()
  name!: string;
}
