/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { SchoolClass } from './schoolClass';

@ObjectType()
export class Department {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field((type) => [SchoolClass])
  schoolClasses?: SchoolClass[];

  @Field((type) => Int)
  schoolId!: number;
}

@InputType()
export class DepartmentInput {
  @Field()
  name!: string;
}
