import { Authorized } from 'type-graphql';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsFQDN, MaxLength } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { Admin } from '../admin/admin.type.';
import { Department } from '../department/department.type';
import { SchoolSubject } from '../schoolSubject/schoolSubject.type';
import { Student } from '../student/student.type';
import { Teacher } from '../teacher/teacher.type';

@ObjectType()
export class School {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  domain!: string;

  @Field((type) => [Department])
  departments!: Department[];

  @Authorized('ADMIN')
  @Field((type) => [Admin])
  admins!: Admin[];

  @Field((type) => [SchoolSubject])
  schoolSubjects!: SchoolSubject[];

  @Field((type) => [Teacher])
  teachers!: Teacher[];
}

@InputType()
export class SchoolCreationInput {
  @MaxLength(150)
  @Field()
  name!: string;

  @IsFQDN()
  @Field()
  domain!: string;
}

@InputType()
export class SchoolUpdateInput {
  @Field((type) => Int)
  id!: number;

  @MaxLength(150)
  @Field()
  name!: string;

  @IsFQDN()
  @Field()
  domain!: string;
}
