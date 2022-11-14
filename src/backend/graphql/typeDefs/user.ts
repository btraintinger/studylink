import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id!: string;

  @Field()
  name?: string;

  @Field()
  email!: string;

  @Field()
  role!: string;
}
