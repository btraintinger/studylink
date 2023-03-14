/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, MaxLength, Min, MinLength } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  email!: string;

  @Field()
  role!: string;
}

@InputType()
export class UserUpdateInput {
  @IsEmail()
  @Field()
  email!: string;

  @MaxLength(150)
  @Field()
  name!: string;
}

@InputType()
export class ResetPasswordInput {
  @MinLength(8)
  @Field()
  password!: string;

  @Field()
  token!: string;
}

@InputType()
export class ForgotPasswordInput {
  @IsEmail()
  @Field()
  email!: string;
}

@InputType()
export class VerifyEmailInput {
  @MinLength(1)
  @Field()
  token!: string;
}
