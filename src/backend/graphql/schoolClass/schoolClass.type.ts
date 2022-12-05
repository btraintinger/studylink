/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { SchoolSubject } from '../schoolSubject/schoolSubject.type';
import { Student } from '../student/student.type';
import { Department } from '../department/department.type';

@ObjectType()
export class SchoolClass {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  grade!: number;

  @Field((type) => [SchoolSubject])
  subjects?: SchoolSubject[];

  @Field((type) => Int)
  departmentId!: number;
}

@InputType()
export class SchoolClassInput {
  @Field()
  className!: string;

  @Field()
  grade!: number;
}