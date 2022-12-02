/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { SchoolClass } from './schoolClass';
import { TutorOffering } from './tutorOffer';
import { TutorRequest } from './tutorRequest';
import { User } from './user';

@ObjectType()
export class Student {
  @Field((type) => ID)
  id!: number;

  @Field((type) => [TutorOffering])
  tutorOfferings?: TutorOffering[];

  @Field((type) => [TutorRequest])
  tutorRequest?: TutorRequest[];

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
