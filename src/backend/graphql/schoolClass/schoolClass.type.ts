/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { SchoolSubject } from '../schoolSubject/schoolSubject.type';

@ObjectType()
export class SchoolClass {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  longName!: string;

  @Field((type) => [SchoolSubject])
  schoolSubjects?: SchoolSubject[];

  @Field((type) => Int)
  departmentId!: number;
}

@InputType()
export class SchoolClassCreationInput {
  @Field()
  name!: string;

  @Field()
  longName!: string;

  @Field((type) => Int)
  departmentId!: number;
}

@InputType()
export class SchoolClassUpdateInput {
  @Field((type) => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  longName!: string;
}
