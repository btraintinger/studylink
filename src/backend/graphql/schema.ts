import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { AdminResolver } from './admin/admin.resolver';
import { customAuthChecker } from './authChecker';
import { DepartmentResolver } from './department/department.resolver';
import { MatchResolver } from './match/match.resolver';
import { SchoolResolver } from './school/school.resolver';
import { SchoolClassResolver } from './schoolClass/schoolClass.resolver';
import { SchoolSubjectResolver } from './schoolSubject/schoolSubject.resolver';
import { StudentResolver } from './student/student.resolver';
import { TeacherResolver } from './teacher/teacher.resolver';
import { TutorOfferingResolver } from './tutorOffering/tutorOffering.resolver';
import { TutorRequestResolver } from './tutorRequest/tutorRequest.resolver';
import { UserResolver } from './user/user.resolver';
import { WebUntisResolver } from './webuntis/webuntis.resolver';

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
      TeacherResolver,
      UserResolver,
      WebUntisResolver,
    ],
    authChecker: customAuthChecker,
  });
  return schema;
}
