import { GetOfferingRequestFormDataQuery } from '../../generated/graphql';
import wrongNumberToNumber from './wrongNumberToString';

export const getSchoolSubjectOptions = (
  data: GetOfferingRequestFormDataQuery | undefined
): { id: number; name: string }[] => {
  return (
    data?.getSchoolOfOwnStudent.schoolSubjects.map((schoolSubject) => ({
      id: wrongNumberToNumber(schoolSubject.id),
      name: `${schoolSubject.name} - ${schoolSubject.longName}`,
    })) ?? []
  );
};

export const getTeacherOptions = (
  data: GetOfferingRequestFormDataQuery | undefined
): { id: number; name: string }[] => {
  return (
    data?.getSchoolOfOwnStudent.teachers.map((teacher) => ({
      id: wrongNumberToNumber(teacher.id),
      name: teacher.name,
    })) ?? []
  );
};
