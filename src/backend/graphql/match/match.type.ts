/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Min } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { SchoolClass } from '../schoolClass/schoolClass.type';
import { Student } from '../student/student.type';
import { TutorOffering } from '../tutorOffering/tutorOffering.type';
import { TutorRequest } from '../tutorRequest/tutorRequest.type';

@ObjectType()
export class Match {
  @Field((type) => ID)
  id!: number;

  @Field()
  rating!: number;

  @Field()
  type!: string;

  @Field()
  tutorOffering!: TutorOffering;

  @Field()
  tutorRequest!: TutorRequest;
}

@ObjectType()
export class MatchConnectionInfo {
  @Field()
  student!: Student;

  @Field()
  schoolClass!: SchoolClass;
}

@InputType()
export class MatchConnectionInfoInput {
  @Min(0)
  @Field()
  studentId!: number;
}

@InputType()
export class AcceptMatchInput {
  @Min(0)
  @Field()
  tutorOfferingId!: number;

  @Min(0)
  @Field()
  tutorRequestId!: number;
}
