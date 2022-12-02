import { Field, InputType } from 'type-graphql';

@InputType()
export class StudentInput {
  @Field()
  schoolClassId!: number;
}

@InputType()
export class SchoolInput {
  @Field()
  name!: string;
}

@InputType()
export class DepartmentInput {
  @Field()
  name!: string;
}

@InputType()
export class SchoolClassInput {
  @Field()
  classname!: string;

  @Field()
  grade!: number;
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

@InputType()
export class TutorRequestInput {
  @Field()
  studentId!: number;

  @Field()
  schoolClassId!: number;

  @Field()
  schoolSubjectId!: number;

  @Field()
  teacher?: string;

  @Field()
  description?: string;
}
