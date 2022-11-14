import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class TutoringRequest {
  @Field((type) => ID)
  id!: string;

  @Field()
  school_class!: string;

  @Field()
  email!: string;

  @Field()
  role!: string;
}
