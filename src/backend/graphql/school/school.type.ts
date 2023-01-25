/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { Admin } from '../admin/admin.type.';
import { Department } from '../department/department.type';

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
export class SchoolCreationInput {
  @Field()
  name!: string;
}

@InputType()
export class SchoolUpdateInput {
  @Field((type) => Int)
  id!: number;

  @Field()
  name!: string;
}
