import { ObjectType } from 'type-graphql';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from 'type-graphql';

@ObjectType()
@InputType()
export class WebUntis {
  @Field()
  school!: string;

  @Field()
  secret!: string;

  @Field()
  server!: string;

  @Field()
  username!: string;

  @Field()
  useBirthYearInStudentMail!: boolean;
}
