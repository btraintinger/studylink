/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { SchoolClass } from '../schoolClass/schoolClass.type';
import { SchoolSubject } from '../schoolSubject/schoolSubject.type';
import { Student } from '../student/student.type';

@ObjectType()
export class TutorOffering {
  @Field((type) => ID)
  id!: number;

  @Field((type) => Int)
  studentId!: number;

  @Field()
  schoolClass!: SchoolClass;

  @Field()
  schoolSubject!: SchoolSubject;

  @Field()
  teacher!: string;

  @Field()
  description!: string;
}

@InputType()
export class TutorOfferingInput {
  @Field((type) => Int)
  id!: number;

  @Field((type) => Int)
  studentId!: number;

  @Field((type) => Int)
  schoolClassId!: number;

  @Field((type) => Int)
  schoolSubjectId!: number;

  @Field()
  teacher!: string;

  @Field()
  description!: string;
}
