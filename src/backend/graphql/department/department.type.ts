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

  @Field()
  school!: School;
}

@InputType()
export class DepartmentInput {
  @Field()
  name!: string;
}
