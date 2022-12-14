/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { SchoolClass } from '../schoolClass/schoolClass.type';
import { SchoolSubject } from '../schoolSubject/schoolSubject.type';
import { Student } from '../student/student.type';

@ObjectType()
export class TutorRequest {
  @Field((type) => ID)
  id!: number;

  @Field()
  student!: Student;

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
export class TutorRequestInput {
  @Field((type) => ID)
  id!: number;

  @Field()
  studentId!: number;

  @Field()
  schoolClassId!: number;

  @Field()
  schoolSubjectId!: number;

  @Field()
  teacher?: string;

  @Field()
  description?: string;
}

@InputType()
export class TutorRequestCreationInput {
  @Field()
  studentId!: number;

  @Field()
  schoolClassId!: number;

  @Field()
  schoolSubjectId!: number;

  @Field()
  teacher?: string;

  @Field()
  description?: string;
}

@InputType()
export class TutorRequestUpdateInput {
  @Field((type) => ID)
  id!: number;

  @Field()
  studentId!: number;

  @Field()
  schoolClassId!: number;

  @Field()
  schoolSubjectId!: number;

  @Field()
  teacher?: string;

  @Field()
  description?: string;
}
