export interface IMenuItem {
  text: string;
  route: string;
  icon: string;
}

export interface ISchoolSubject {
  id: number;
  name: string;
  extendedName: string;
}

export interface IOffer {
  id: number;
  schoolSubject: ISchoolSubject;
  teacher: string;
  grade: number;
  description: string;
}
