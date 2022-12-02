/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { Admin } from './admin';
import { Department } from './department';

@ObjectType()
export class School {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field((type) => [Department])
  departments?: Department[];

  @Field((type) => [Admin])
  admins!: Admin[];
}

@InputType()
export class SchoolInput {
  @Field()
  name!: string;
}
