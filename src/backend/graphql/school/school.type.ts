/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsFQDN, MaxLength } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { Admin } from '../admin/admin.type.';
import { Department } from '../department/department.type';

@ObjectType()
export class School {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  domain!: string;

  @Field((type) => [Department])
  departments?: Department[];

  @Field((type) => [Admin])
  admins!: Admin[];
}

@InputType()
export class SchoolCreationInput {
  @MaxLength(150)
  @Field()
  name!: string;

  @IsFQDN()
  @Field()
  domain!: string;
}

@InputType()
export class SchoolUpdateInput {
  @Field((type) => Int)
  id!: number;

  @MaxLength(150)
  @Field()
  name!: string;

  @IsFQDN()
  @Field()
  domain!: string;
}
