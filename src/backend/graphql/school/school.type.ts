/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { Admin } from '../admin/admin.type.';
import { Department } from '../department/department.type';

@ObjectType()
export class School {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  handle!: string;

  @Field()
  domain!: string;

  @Field((type) => [Department])
  departments?: Department[];

  @Field((type) => [Admin])
  admins!: Admin[];
}

@InputType()
export class SchoolInput {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  handle!: string;

  @Field()
  domain!: string;
}
