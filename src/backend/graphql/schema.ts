import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { customAuthChecker } from './authChecker';
import { SchoolClassResolver } from './schoolClass/schoolClass.resolver';
import { UserResolver } from './user/user.resolver';
import { TutorRequestResolver } from './tutorRequest/tutorRequest.resolver';
import { TutorOfferingResolver } from './tutorOffering/tutorOffering.resolver';
import { StudentResolver } from './student/student.resolver';
import { SchoolSubjectResolver } from './schoolSubject/schoolSubject.resolver';
import { SchoolResolver } from './school/school.resolver';
import { MatchResolver } from './match/match.resolver';
import { DepartmentResolver } from './department/department.resolver';
import { AdminResolver } from './admin/admin.resolver';

export default async function createSchema() {
  const schema = await buildSchema({
    resolvers: [
      AdminResolver,
      DepartmentResolver,
      MatchResolver,
      SchoolResolver,
      SchoolClassResolver,
      SchoolSubjectResolver,
      StudentResolver,
      TutorOfferingResolver,
      TutorRequestResolver,
      UserResolver,
    ],
    authChecker: customAuthChecker,
  });
  return schema;
}
