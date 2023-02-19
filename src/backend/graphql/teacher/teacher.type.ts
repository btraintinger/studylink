/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { SchoolSubject } from '../schoolSubject/schoolSubject.type';

@ObjectType()
export class Teacher {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  longName!: string;

  @Field((type) => [SchoolSubject])
  schoolSubjects?: SchoolSubject[];

  @Field()
  schoolId!: number;
}

@InputType()
export class TeacherCreationInput {
  @Field()
  name!: string;

  @Field()
  longName!: string;
}

@InputType()
export class TeacherUpdateInput {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  longName!: string;
}
