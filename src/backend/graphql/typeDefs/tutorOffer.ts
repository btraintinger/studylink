/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { SchoolClass } from './schoolClass';
import { SchoolSubject } from './schoolSubject';

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
  @Field()
  studentId!: number;

  @Field()
  schoolClassId!: number;

  @Field()
  schoolSubjectId!: number;

  @Field()
  teacher!: string;

  @Field()
  description!: string;
}
