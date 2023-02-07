/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, MaxLength } from 'class-validator';
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
  tutorOfferings!: TutorOffering[];

  @Field((type) => [TutorRequest])
  tutorRequests!: TutorRequest[];

  @Field()
  schoolClass!: SchoolClass;

  @Field()
  user!: User;
}

@InputType()
export class StudentCreationInput {
  @MaxLength(150)
  @Field()
  name!: string;

  @MaxLength(150)
  @Field()
  firstName!: string;

  @MaxLength(150)
  @Field()
  lastName!: string;

  @IsEmail()
  @Field()
  email!: string;

  @Field()
  schoolClassId!: number;
}

@InputType()
export class StudentUpdateInput {
  @Field((type) => Int)
  id!: number;

  @MaxLength(150)
  @Field()
  name!: string;

  @MaxLength(150)
  @Field()
  firstName!: string;

  @MaxLength(150)
  @Field()
  lastName!: string;

  @IsEmail()
  @Field()
  email!: string;

  @Field()
  schoolClassId!: number;
}
