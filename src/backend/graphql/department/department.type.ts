/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { SchoolClass } from '../schoolClass/schoolClass.type';
import { School } from '../school/school.type';

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
export class DepartmentCreateInput {
  @Field()
  name!: string;

  @Field((type) => Int)
  schoolId!: number;
}

@InputType()
export class DepartmentUpdateInput {
  @Field((type) => Int)
  id!: number;

  @Field()
  name!: string;
}
