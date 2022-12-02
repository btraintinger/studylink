/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID, Int } from 'type-graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id!: number;

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

  @Field()
  user!: User;

  @Field((type) => Int)
  schoolId?: number;
}

@ObjectType()
export class Student {
  @Field((type) => ID)
  id!: number;

  @Field()
  schoolClass?: SchoolClass;

  @Field((type) => [TutorOffering])
  tutorOfferings?: TutorOffering[];

  @Field((type) => [TutorRequest])
  tutorRequest?: TutorRequest[];

  @Field()
  user!: User;
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
  schoolClasses?: SchoolClass[];

  @Field((type) => Int)
  schoolId!: number;
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
  subjects?: SchoolSubject[];

  @Field((type) => Int)
  departmentId!: number;
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

@ObjectType()
export class TutorRequest {
  @Field((type) => ID)
  id!: string;

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

@ObjectType()
export class Match {
  @Field()
  tutorOffering!: TutorOffering;

  @Field()
  tutorRequest!: TutorRequest;
}
