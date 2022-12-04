/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import type { Context } from '../context';
import { SchoolSubject } from './schoolSubject.type';

@Resolver((of) => SchoolSubject)
export class SchoolSubjectResolver {}
