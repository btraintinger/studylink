/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class SchoolSubject {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  longName!: string;
}

@InputType()
export class SchoolSubjectCreationInput {
  @Field()
  name!: string;

  @Field()
  longName!: string;
}

@InputType()
export class SchoolSubjectUpdateInput {
  @Field((type) => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  longName!: string;
}
