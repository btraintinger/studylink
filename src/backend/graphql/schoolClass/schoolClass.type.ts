/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MaxLength } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { SchoolSubject } from '../schoolSubject/schoolSubject.type';
import { Student } from '../student/student.type';

@ObjectType()
export class SchoolClass {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  longName!: string;

  @Field((type) => [SchoolSubject])
  schoolSubjects!: SchoolSubject[];

  @Field((type) => Int)
  departmentId!: number;

  @Field((type) => [Student])
  students!: Student[];
}

@InputType()
export class SchoolClassCreationInput {
  @MaxLength(150)
  @Field()
  name!: string;

  @MaxLength(150)
  @Field()
  longName!: string;

  @Field((type) => Int)
  departmentId!: number;
}

@InputType()
export class SchoolClassUpdateInput {
  @Field((type) => Int)
  id!: number;

  @MaxLength(150)
  @Field()
  name!: string;

  @MaxLength(150)
  @Field()
  longName!: string;
}
