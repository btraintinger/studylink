import { Teacher } from './../teacher/teacher.type';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Max, MaxLength, Min } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { SchoolSubject } from '../schoolSubject/schoolSubject.type';
import { Student } from '../student/student.type';

@ObjectType()
export class TutorRequest {
  @Field((type) => ID)
  id!: number;

  @Field()
  student!: Student;

  @Field()
  schoolSubject!: SchoolSubject;

  @Field()
  teacher!: Teacher;

  @Field()
  description!: string;

  @Field()
  grade!: number;
}

@InputType()
export class TutorRequestCreationInput {
  @Field()
  schoolSubjectId!: number;

  @Field()
  teacherId!: number;

  @MaxLength(1000)
  @Field()
  description!: string;

  @Min(1)
  @Max(13)
  @Field()
  grade!: number;
}

@InputType()
export class TutorRequestUpdateInput {
  @Field((type) => Int)
  id!: number;

  @Field()
  schoolSubjectId!: number;

  @Field()
  teacherId!: number;

  @MaxLength(1000)
  @Field()
  description!: string;

  @Min(1)
  @Max(13)
  @Field()
  grade!: number;
}
