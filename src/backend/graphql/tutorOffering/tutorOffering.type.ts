/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Max, MaxLength, Min } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { SchoolSubject } from '../schoolSubject/schoolSubject.type';

@ObjectType()
export class TutorOffering {
  @Field((type) => ID)
  id!: number;

  @Field((type) => Int)
  studentId!: number;

  @Field()
  schoolSubject!: SchoolSubject;

  @Field()
  teacher!: string;

  @Field()
  description!: string;

  @Field()
  grade!: number;
}

@InputType()
export class TutorOfferingInputCreation {
  @Field((type) => Int)
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
export class TutorOfferingUpdateInput {
  @Field((type) => Int)
  id!: number;

  @Field((type) => Int)
  schoolSubjectId!: number;

  @Field()
  teacherId!: number;

  @Field()
  description!: string;

  @Min(1)
  @Max(13)
  @Field()
  grade!: number;
}
