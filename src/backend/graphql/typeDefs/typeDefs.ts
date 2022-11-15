/* eslint-disable @typescript-eslint/no-unused-vars */

import { Field, ObjectType, ID, InputType } from 'type-graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  role!: string;
}

@ObjectType()
export class Admin {
  @Field((type) => ID)
  id!: string;
}

@InputType()
export class AdminInput {

  @Field()
  user_id!: string;
  
  @Field()
  school_id?: number;
}

@ObjectType()
export class Student {
  @Field((type) => ID)
  id!: string;
}

@ObjectType()
export class School {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field((type) => [Department])
  departments?: Department[];

  @Field((type) => [Admin])
  admins!: Admin[];
}

@ObjectType()
export class Department {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field((type) => [SchoolClass])
  SchoolClasses?: SchoolClass[];
}

@InputType()
export class DepartmentInput {

  @Field()
  name!: string;
}

@ObjectType()
export class SchoolClass {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  grade!: number;

  @Field((type) => [SchoolSubject])
  subjects!: SchoolSubject[];
}

@InputType()
export class SchoolClassInput {

  @Field()
  classname!: string;

  @Field()
  grade!: number;

  @Field((type) => [SchoolSubject])
  subjects!: SchoolSubject[];
}

@ObjectType()
export class SchoolSubject {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  extendedName!: string;
}

@ObjectType()
export class TutorOffering {
  @Field((type) => ID)
  id!: string;

  @Field()
  student!: Student;

  @Field()
  SchoolClass!: SchoolClass;

  @Field()
  SchoolSubject!: SchoolSubject;

  @Field()
  teacher!: string;

  @Field()
  description!: string;
}

@InputType()
export class TutorOfferingInput {

  @Field()
  student!: Student;

  @Field()
  SchoolClass!: SchoolClass;

  @Field()
  SchoolSubject!: SchoolSubject;

  @Field()
  teacher!: string;

  @Field()
  description!: string;
}

@ObjectType()
export class TutorRequest {
  @Field((type) => ID)
  id!: string;

  @Field()
  student!: Student;

  @Field()
  SchoolClass!: SchoolClass;

  @Field()
  SchoolSubject!: SchoolSubject;
}

@InputType()
export class TutorRequestInput {

  @Field()
  student!: Student;

  @Field()
  SchoolClass!: SchoolClass;

  @Field()
  SchoolSubject!: SchoolSubject;

  @Field()
  teacher?: string;
}

@ObjectType()
export class Match {
  @Field()
  tutorOffering!: TutorOffering;

  @Field()
  tutorRequest!: TutorRequest;
}


