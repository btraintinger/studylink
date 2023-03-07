/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { TutorOffering } from '../tutorOffering/tutorOffering.type';
import { TutorRequest } from '../tutorRequest/tutorRequest.type';

@ObjectType()
export class Match {
  @Field((type) => ID)
  id!: number;

  @Field()
  rating!: number;

  @Field()
  type!: string;

  @Field()
  tutorOffering!: TutorOffering;

  @Field()
  tutorRequest!: TutorRequest;
}

@InputType()
export class AcceptMatchInput {
  @Field()
  tutorOfferingId!: number;

  @Field()
  tutorRequestId!: number;
}
