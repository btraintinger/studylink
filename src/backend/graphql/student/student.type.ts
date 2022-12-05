/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { SchoolClass } from '../schoolClass/schoolClass.type';
import { TutorOffering } from '../tutorOffering/tutorOffering.type';
import { TutorRequest } from '../tutorRequest/tutorRequest.type';
import { User } from '../user/user.type';

@ObjectType()
export class Student {
  @Field((type) => ID)
  id!: number;

  @Field((type) => [TutorOffering])
  tutorOfferings?: TutorOffering[];

  @Field((type) => [TutorRequest])
  tutorRequests?: TutorRequest[];

  @Field()
  schoolClass?: SchoolClass;

  @Field()
  user!: User;
}

@InputType()
export class StudentInput {
  @Field()
  schoolClassId!: number;
}