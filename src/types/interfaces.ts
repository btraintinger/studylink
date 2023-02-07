import {
  TutorOffering,
  TutorRequest,
  School,
  SchoolClass,
  SchoolSubject,
  Department,
  Teacher,
  Student,
} from '../../generated/graphql';

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

export interface ISchoolClass {
  id: number;
  name: string;
  longName: string;
}

export interface IOffer {
  id: number;
  schoolSubject: SchoolSubject;
  teacher: Teacher;
  grade: number;
  description: string;
}

export type TTableItem =
  | TutorOffering[]
  | TutorRequest[]
  | School[]
  | Department[]
  | SchoolClass[]
  | SchoolSubject[]
  | Teacher[]
  | Student[];

export type TRow = IOffer[] | ISchoolClass[] | ISchoolSubject[] | ITeacher[];
