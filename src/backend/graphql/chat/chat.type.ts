import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';

@ObjectType()
export class Chat {
  @Field()
  id!: number;

  @Field()
  message!: string;
}
