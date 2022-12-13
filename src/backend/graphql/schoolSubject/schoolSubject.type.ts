/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';

@ObjectType()
export class SchoolSubject {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  extendedName!: string;
}
