import type { TutorOffering } from '../../generated/graphql';
import type { TutorRequest } from '../../generated/graphql';

export interface IMenuItem {
  text: string;
  route: string;
  icon: string;
}

export interface ITeacher {
  schoolId: number;
  id: number;
  name: string;
}

export interface ISchoolSubject {
  id: number;
  longName: string;
  name: string;
}

export interface IOffer {
  id: number;
  schoolSubject: ISchoolSubject;
  teacher: ITeacher;
  grade: number;
  description: string;
}
export type TListTableItem = TutorOffering[] | TutorOffering[];
