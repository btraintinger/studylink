import { MinLength } from 'class-validator';
import { ObjectType } from 'type-graphql';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from 'type-graphql';

@ObjectType()
export class WebUntis {
  @Field()
  school!: string;

  @Field()
  secret!: string;

  @Field()
  server!: string;

  @Field()
  username!: string;
}

@InputType()
export class WebUntisImportInput {
  @MinLength(1)
  @Field()
  school!: string;

  @MinLength(1)
  @Field()
  secret!: string;

  @MinLength(1)
  @Field()
  server!: string;

  @MinLength(1)
  @Field()
  username!: string;
}
