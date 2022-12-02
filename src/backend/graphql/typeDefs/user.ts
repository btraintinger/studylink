/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';

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
