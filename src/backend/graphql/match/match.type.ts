/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, InputType, ID, Int } from 'type-graphql';
import { TutorOffering } from '../tutorOffering/tutorOffering.type';
import { TutorRequest } from '../tutorRequest/tutorRequest.type';

@ObjectType()
export class Match {
  @Field()
  rating!: number;

  @Field()
  tutorOffering!: TutorOffering;

  @Field()
  tutorRequest!: TutorRequest;
}
