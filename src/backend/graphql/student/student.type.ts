/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
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
export class StudentCreationInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  schoolClassId!: number;
}

@InputType()
export class StudentUpdateInput {
  @Field((type) => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  schoolClassId!: number;
}
