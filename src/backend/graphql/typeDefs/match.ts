/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { TutorOffering } from './tutorOffer';
import { TutorRequest } from './tutorRequest';

@ObjectType()
export class Match {
  @Field()
  tutorOffering!: TutorOffering;

  @Field()
  tutorRequest!: TutorRequest;
}
