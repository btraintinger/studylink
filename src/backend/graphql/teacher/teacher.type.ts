import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Teacher {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  longName!: string;

  @Field()
  schoolId!: number;
}

@InputType()
export class TeacherCreationInput {
  @Field()
  name!: string;

  @Field()
  longName!: string;
}

@InputType()
export class TeacherUpdateInput {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  longName!: string;
}
