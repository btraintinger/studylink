import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['ID'];
  schoolId: Scalars['Int'];
  user: User;
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['ID'];
  longName: Scalars['String'];
  name: Scalars['String'];
  schoolClasses: Array<SchoolClass>;
  schoolId: Scalars['Int'];
};

export type DepartmentCreateInput = {
  longName: Scalars['String'];
  name: Scalars['String'];
  schoolId: Scalars['Int'];
};

export type DepartmentUpdateInput = {
  id: Scalars['Int'];
  longName: Scalars['String'];
  name: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type Match = {
  __typename?: 'Match';
  rating: Scalars['Float'];
  tutorOffering: TutorOffering;
  tutorRequest: TutorRequest;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDepartment: Department;
  createSchool: School;
  createSchoolClass: SchoolClass;
  createSchoolSubject: SchoolSubject;
  createStudent: Student;
  createTeacher: Teacher;
  createTutorOffering: TutorOffering;
  createTutorRequest: TutorRequest;
  deleteDepartment: Department;
  deleteOwnUser: User;
  deleteSchool: School;
  deleteSchoolClass: SchoolClass;
  deleteSchoolSubject: SchoolSubject;
  deleteStudent: Student;
  deleteTeacher: Teacher;
  deleteTutorOffering: TutorOffering;
  deleteTutorRequest: TutorRequest;
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  updateDepartment: Department;
  updateSchool: School;
  updateSchoolClass: SchoolClass;
  updateSchoolData: WebUntis;
  updateSchoolSubject: SchoolSubject;
  updateStudent: Student;
  updateTeacher: Teacher;
  updateTutorOffering: TutorOffering;
  updateTutorRequest: TutorRequest;
  updateUser: User;
  verifyEmail: Scalars['Boolean'];
};


export type MutationCreateDepartmentArgs = {
  departmentInput: DepartmentCreateInput;
};


export type MutationCreateSchoolArgs = {
  schoolCreationInput: SchoolCreationInput;
};


export type MutationCreateSchoolClassArgs = {
  schoolClassCreateInput: SchoolClassCreationInput;
};


export type MutationCreateSchoolSubjectArgs = {
  SchoolSubjectCreationInput: SchoolSubjectCreationInput;
};


export type MutationCreateStudentArgs = {
  studentInput: StudentCreationInput;
};


export type MutationCreateTeacherArgs = {
  teacherCreationInput: TeacherCreationInput;
};


export type MutationCreateTutorOfferingArgs = {
  TutorOfferingInputCreation: TutorOfferingInputCreation;
};


export type MutationCreateTutorRequestArgs = {
  TutorRequestCreationInput: TutorRequestCreationInput;
};


export type MutationDeleteDepartmentArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteSchoolArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteSchoolClassArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteSchoolSubjectArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteTeacherArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteTutorOfferingArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteTutorRequestArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationUpdateDepartmentArgs = {
  departmentInput: DepartmentUpdateInput;
};


export type MutationUpdateSchoolArgs = {
  schoolUpdateInput: SchoolUpdateInput;
};


export type MutationUpdateSchoolClassArgs = {
  schoolClassUpdateInput: SchoolClassUpdateInput;
};


export type MutationUpdateSchoolDataArgs = {
  loginData: WebUntisImportInput;
};


export type MutationUpdateSchoolSubjectArgs = {
  SchoolSubjectUpdateInput: SchoolSubjectUpdateInput;
};


export type MutationUpdateStudentArgs = {
  studentInput: StudentUpdateInput;
};


export type MutationUpdateTeacherArgs = {
  teacherUpdateInput: TeacherUpdateInput;
};


export type MutationUpdateTutorOfferingArgs = {
  TutorOfferingUpdateInput: TutorOfferingUpdateInput;
};


export type MutationUpdateTutorRequestArgs = {
  TutorRequestUpdateInput: TutorRequestUpdateInput;
};


export type MutationUpdateUserArgs = {
  userUpdateInput: UserUpdateInput;
};


export type MutationVerifyEmailArgs = {
  verifyEmailInput: VerifyEmailInput;
};

export type Query = {
  __typename?: 'Query';
  getAdminOfCurrentUser: Admin;
  getAdministeredSchool: School;
  getCurrentUser: User;
  getDepartmentById: Department;
  getMatchesOfCurrentUser: Array<Match>;
  getSchoolById: School;
  getSchoolClassById: SchoolClass;
  getSchoolClassesOfSchool: Array<SchoolClass>;
  getSchoolSubjectById: SchoolSubject;
  getStudentById: Student;
  getStudentOfCurrentUser: Student;
  getSubjectsOfStudent: Array<SchoolSubject>;
  getTeacherById: Teacher;
  getTeachersOfStudent: Array<Teacher>;
  getTutorOfferingById: TutorOffering;
  getTutorRequestById: TutorRequest;
};


export type QueryGetDepartmentByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetSchoolByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetSchoolClassByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetSchoolSubjectByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetStudentByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetTeacherByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetTutorOfferingByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetTutorRequestByIdArgs = {
  id: Scalars['Float'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type School = {
  __typename?: 'School';
  admins: Array<Admin>;
  departments: Array<Department>;
  domain: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  schoolSubjects: Array<SchoolSubject>;
  teachers: Array<Teacher>;
};

export type SchoolClass = {
  __typename?: 'SchoolClass';
  departmentId: Scalars['Int'];
  id: Scalars['ID'];
  longName: Scalars['String'];
  name: Scalars['String'];
  schoolSubjects: Array<SchoolSubject>;
  students: Array<Student>;
};

export type SchoolClassCreationInput = {
  departmentId: Scalars['Int'];
  longName: Scalars['String'];
  name: Scalars['String'];
};

export type SchoolClassUpdateInput = {
  id: Scalars['Int'];
  longName: Scalars['String'];
  name: Scalars['String'];
};

export type SchoolCreationInput = {
  domain: Scalars['String'];
  name: Scalars['String'];
};

export type SchoolSubject = {
  __typename?: 'SchoolSubject';
  id: Scalars['ID'];
  longName: Scalars['String'];
  name: Scalars['String'];
};

export type SchoolSubjectCreationInput = {
  longName: Scalars['String'];
  name: Scalars['String'];
};

export type SchoolSubjectUpdateInput = {
  id: Scalars['Int'];
  longName: Scalars['String'];
  name: Scalars['String'];
};

export type SchoolUpdateInput = {
  domain: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['ID'];
  schoolClassId: Scalars['Float'];
  tutorOfferings: Array<TutorOffering>;
  tutorRequests: Array<TutorRequest>;
  user: User;
};

export type StudentCreationInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  schoolClassId: Scalars['Float'];
};

export type StudentUpdateInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  schoolClassId: Scalars['Float'];
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['ID'];
  longName: Scalars['String'];
  name: Scalars['String'];
  schoolId: Scalars['Float'];
};

export type TeacherCreationInput = {
  longName: Scalars['String'];
  name: Scalars['String'];
};

export type TeacherUpdateInput = {
  id: Scalars['ID'];
  longName: Scalars['String'];
  name: Scalars['String'];
};

export type TutorOffering = {
  __typename?: 'TutorOffering';
  description: Scalars['String'];
  grade: Scalars['Float'];
  id: Scalars['ID'];
  schoolSubject: SchoolSubject;
  studentId: Scalars['Int'];
  teacher: Teacher;
};

export type TutorOfferingInputCreation = {
  description: Scalars['String'];
  grade: Scalars['Float'];
  schoolSubjectId: Scalars['Int'];
  teacherId: Scalars['Float'];
};

export type TutorOfferingUpdateInput = {
  description: Scalars['String'];
  grade: Scalars['Float'];
  id: Scalars['Int'];
  schoolSubjectId: Scalars['Int'];
  teacherId: Scalars['Float'];
};

export type TutorRequest = {
  __typename?: 'TutorRequest';
  description: Scalars['String'];
  grade: Scalars['Float'];
  id: Scalars['ID'];
  schoolSubject: SchoolSubject;
  studentId: Scalars['Float'];
  teacher: Teacher;
};

export type TutorRequestCreationInput = {
  description: Scalars['String'];
  grade: Scalars['Float'];
  schoolSubjectId: Scalars['Float'];
  teacherId: Scalars['Float'];
};

export type TutorRequestUpdateInput = {
  description: Scalars['String'];
  grade: Scalars['Float'];
  id: Scalars['Int'];
  schoolSubjectId: Scalars['Float'];
  teacherId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type UserUpdateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type VerifyEmailInput = {
  token: Scalars['String'];
};

export type WebUntis = {
  __typename?: 'WebUntis';
  school: Scalars['String'];
  secret: Scalars['String'];
  server: Scalars['String'];
  username: Scalars['String'];
};

export type WebUntisImportInput = {
  school: Scalars['String'];
  secret: Scalars['String'];
  server: Scalars['String'];
  username: Scalars['String'];
};

export type GetDepartmentByIdQueryVariables = Exact<{
  getDepartmentByIdId: Scalars['Float'];
}>;


export type GetDepartmentByIdQuery = { __typename?: 'Query', getDepartmentById: { __typename?: 'Department', id: number, longName: string, name: string, schoolClasses: Array<{ __typename?: 'SchoolClass', longName: string, name: string, id: number }> } };

export type CreateDepartmentMutationVariables = Exact<{
  departmentInput: DepartmentCreateInput;
}>;


export type CreateDepartmentMutation = { __typename?: 'Mutation', createDepartment: { __typename?: 'Department', id: number, name: string, longName: string } };

export type UpdateDepartmentMutationVariables = Exact<{
  departmentInput: DepartmentUpdateInput;
}>;


export type UpdateDepartmentMutation = { __typename?: 'Mutation', updateDepartment: { __typename?: 'Department', id: number, name: string, longName: string } };

export type DeleteDepartmentMutationVariables = Exact<{
  deleteDepartmentId: Scalars['Float'];
}>;


export type DeleteDepartmentMutation = { __typename?: 'Mutation', deleteDepartment: { __typename?: 'Department', id: number } };

export type GetMatchesOfCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMatchesOfCurrentUserQuery = { __typename?: 'Query', getMatchesOfCurrentUser: Array<{ __typename?: 'Match', rating: number, tutorOffering: { __typename?: 'TutorOffering', id: number, description: string, grade: number, studentId: number, schoolSubject: { __typename?: 'SchoolSubject', id: number, name: string, longName: string }, teacher: { __typename?: 'Teacher', id: number, longName: string, name: string, schoolId: number } }, tutorRequest: { __typename?: 'TutorRequest', description: string, grade: number, id: number, studentId: number, schoolSubject: { __typename?: 'SchoolSubject', id: number, longName: string, name: string }, teacher: { __typename?: 'Teacher', id: number, longName: string, name: string, schoolId: number } } }> };

export type GetTutorOfferingByIdQueryVariables = Exact<{
  getTutorOfferingByIdId: Scalars['Float'];
}>;


export type GetTutorOfferingByIdQuery = { __typename?: 'Query', getTutorOfferingById: { __typename?: 'TutorOffering', description: string, grade: number, id: number, studentId: number, schoolSubject: { __typename?: 'SchoolSubject', name: string, longName: string, id: number }, teacher: { __typename?: 'Teacher', id: number, name: string, schoolId: number } } };

export type CreateTutorOfferingMutationVariables = Exact<{
  tutorOfferingInputCreation: TutorOfferingInputCreation;
}>;


export type CreateTutorOfferingMutation = { __typename?: 'Mutation', createTutorOffering: { __typename?: 'TutorOffering', description: string, grade: number, id: number, schoolSubject: { __typename?: 'SchoolSubject', id: number, longName: string, name: string }, teacher: { __typename?: 'Teacher', schoolId: number, id: number, name: string } } };

export type UpdateTutorOfferingMutationVariables = Exact<{
  tutorOfferingUpdateInput: TutorOfferingUpdateInput;
}>;


export type UpdateTutorOfferingMutation = { __typename?: 'Mutation', updateTutorOffering: { __typename?: 'TutorOffering', description: string, grade: number, id: number, schoolSubject: { __typename?: 'SchoolSubject', id: number, longName: string, name: string }, teacher: { __typename?: 'Teacher', schoolId: number, id: number, name: string } } };

export type GetTutorRequestByIdQueryVariables = Exact<{
  getTutorRequestByIdId: Scalars['Float'];
}>;


export type GetTutorRequestByIdQuery = { __typename?: 'Query', getTutorRequestById: { __typename?: 'TutorRequest', description: string, grade: number, id: number, schoolSubject: { __typename?: 'SchoolSubject', name: string, longName: string, id: number }, teacher: { __typename?: 'Teacher', schoolId: number, name: string, id: number } } };

export type CreateTutorRequestMutationVariables = Exact<{
  tutorRequestCreationInput: TutorRequestCreationInput;
}>;


export type CreateTutorRequestMutation = { __typename?: 'Mutation', createTutorRequest: { __typename?: 'TutorRequest', description: string, grade: number, id: number, schoolSubject: { __typename?: 'SchoolSubject', name: string, longName: string, id: number }, teacher: { __typename?: 'Teacher', schoolId: number, name: string, id: number } } };

export type UpdateTutorRequestMutationVariables = Exact<{
  tutorRequestUpdateInput: TutorRequestUpdateInput;
}>;


export type UpdateTutorRequestMutation = { __typename?: 'Mutation', updateTutorRequest: { __typename?: 'TutorRequest', description: string, grade: number, id: number, schoolSubject: { __typename?: 'SchoolSubject', name: string, longName: string, id: number }, teacher: { __typename?: 'Teacher', schoolId: number, name: string, id: number } } };

export type GetSchoolByIdQueryVariables = Exact<{
  getSchoolByIdId: Scalars['Float'];
}>;


export type GetSchoolByIdQuery = { __typename?: 'Query', getSchoolById: { __typename?: 'School', domain: string, id: number, name: string, departments: Array<{ __typename?: 'Department', longName: string, name: string, id: number }> } };

export type GetAdministeredSchoolQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdministeredSchoolQuery = { __typename?: 'Query', getAdministeredSchool: { __typename?: 'School', name: string, domain: string, id: number } };

export type CreateSchoolMutationVariables = Exact<{
  schoolCreationInput: SchoolCreationInput;
}>;


export type CreateSchoolMutation = { __typename?: 'Mutation', createSchool: { __typename?: 'School', id: number, name: string, domain: string } };

export type UpdateSchoolMutationVariables = Exact<{
  schoolUpdateInput: SchoolUpdateInput;
}>;


export type UpdateSchoolMutation = { __typename?: 'Mutation', updateSchool: { __typename?: 'School', id: number, name: string, domain: string } };

export type GetSchoolClassesOfSchoolQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchoolClassesOfSchoolQuery = { __typename?: 'Query', getSchoolClassesOfSchool: Array<{ __typename?: 'SchoolClass', longName: string, name: string, id: number }> };

export type GetSchoolClassByIdQueryVariables = Exact<{
  getSchoolClassByIdId: Scalars['Float'];
}>;


export type GetSchoolClassByIdQuery = { __typename?: 'Query', getSchoolClassById: { __typename?: 'SchoolClass', id: number, name: string, longName: string } };

export type CreateSchoolClassMutationVariables = Exact<{
  schoolClassCreateInput: SchoolClassCreationInput;
}>;


export type CreateSchoolClassMutation = { __typename?: 'Mutation', createSchoolClass: { __typename?: 'SchoolClass', id: number, name: string, longName: string } };

export type UpdateSchoolClassMutationVariables = Exact<{
  schoolClassUpdateInput: SchoolClassUpdateInput;
}>;


export type UpdateSchoolClassMutation = { __typename?: 'Mutation', updateSchoolClass: { __typename?: 'SchoolClass', id: number, name: string, longName: string } };

export type DeleteSchoolClassMutationVariables = Exact<{
  deleteSchoolClassId: Scalars['Float'];
}>;


export type DeleteSchoolClassMutation = { __typename?: 'Mutation', deleteSchoolClass: { __typename?: 'SchoolClass', id: number } };

export type GetSchoolSubjectByIdQueryVariables = Exact<{
  getSchoolSubjectByIdId: Scalars['Float'];
}>;


export type GetSchoolSubjectByIdQuery = { __typename?: 'Query', getSchoolSubjectById: { __typename?: 'SchoolSubject', id: number, longName: string, name: string } };

export type CreateSchoolSubjectMutationVariables = Exact<{
  schoolSubjectCreationInput: SchoolSubjectCreationInput;
}>;


export type CreateSchoolSubjectMutation = { __typename?: 'Mutation', createSchoolSubject: { __typename?: 'SchoolSubject', id: number, longName: string, name: string } };

export type UpdateSchoolSubjectMutationVariables = Exact<{
  schoolSubjectUpdateInput: SchoolSubjectUpdateInput;
}>;


export type UpdateSchoolSubjectMutation = { __typename?: 'Mutation', updateSchoolSubject: { __typename?: 'SchoolSubject', id: number, longName: string, name: string } };

export type DeleteSchoolSubjectMutationVariables = Exact<{
  deleteSchoolSubjectId: Scalars['Float'];
}>;


export type DeleteSchoolSubjectMutation = { __typename?: 'Mutation', deleteSchoolSubject: { __typename?: 'SchoolSubject', id: number } };

export type GetAdministeredSchoolSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdministeredSchoolSubjectsQuery = { __typename?: 'Query', getAdministeredSchool: { __typename?: 'School', schoolSubjects: Array<{ __typename?: 'SchoolSubject', id: number, longName: string, name: string }> } };

export type GetStudentByIdQueryVariables = Exact<{
  getStudentByIdId: Scalars['Float'];
}>;


export type GetStudentByIdQuery = { __typename?: 'Query', getStudentById: { __typename?: 'Student', id: number, schoolClassId: number, user: { __typename?: 'User', email: string, name: string, firstName: string, lastName: string } } };

export type CreateStudentMutationVariables = Exact<{
  studentInput: StudentCreationInput;
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: number, schoolClassId: number, user: { __typename?: 'User', email: string, name: string, firstName: string, lastName: string } } };

export type UpdateStudentMutationVariables = Exact<{
  studentInput: StudentUpdateInput;
}>;


export type UpdateStudentMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'Student', id: number, schoolClassId: number, user: { __typename?: 'User', email: string, name: string, firstName: string, lastName: string } } };

export type DeleteStudentMutationVariables = Exact<{
  deleteStudentId: Scalars['Float'];
}>;


export type DeleteStudentMutation = { __typename?: 'Mutation', deleteStudent: { __typename?: 'Student', id: number } };

export type GetStudentOfCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentOfCurrentUserQuery = { __typename?: 'Query', getStudentOfCurrentUser: { __typename?: 'Student', id: number, schoolClassId: number, tutorOfferings: Array<{ __typename?: 'TutorOffering', description: string, grade: number, id: number, schoolSubject: { __typename?: 'SchoolSubject', name: string, longName: string, id: number }, teacher: { __typename?: 'Teacher', name: string, longName: string, id: number } }>, tutorRequests: Array<{ __typename?: 'TutorRequest', description: string, grade: number, id: number, schoolSubject: { __typename?: 'SchoolSubject', name: string, longName: string, id: number }, teacher: { __typename?: 'Teacher', schoolId: number, name: string, longName: string, id: number } }>, user: { __typename?: 'User', email: string, id: number, name: string } } };

export type GetSubjectsOfStudentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsOfStudentQuery = { __typename?: 'Query', getSubjectsOfStudent: Array<{ __typename?: 'SchoolSubject', id: number, longName: string, name: string }> };

export type GetTeachersOfStudentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeachersOfStudentQuery = { __typename?: 'Query', getTeachersOfStudent: Array<{ __typename?: 'Teacher', name: string, schoolId: number, id: number }> };

export type GetAdministeredStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdministeredStudentsQuery = { __typename?: 'Query', getAdministeredSchool: { __typename?: 'School', departments: Array<{ __typename?: 'Department', name: string, schoolClasses: Array<{ __typename?: 'SchoolClass', departmentId: number, name: string, students: Array<{ __typename?: 'Student', id: number, schoolClassId: number, user: { __typename?: 'User', name: string, id: number, email: string } }> }> }> } };

export type GetTeacherByIdQueryVariables = Exact<{
  getTeacherByIdId: Scalars['Float'];
}>;


export type GetTeacherByIdQuery = { __typename?: 'Query', getTeacherById: { __typename?: 'Teacher', id: number, name: string, longName: string, schoolId: number } };

export type CreateTeacherMutationVariables = Exact<{
  teacherCreationInput: TeacherCreationInput;
}>;


export type CreateTeacherMutation = { __typename?: 'Mutation', createTeacher: { __typename?: 'Teacher', id: number, name: string, longName: string, schoolId: number } };

export type UpdateTeacherMutationVariables = Exact<{
  teacherUpdateInput: TeacherUpdateInput;
}>;


export type UpdateTeacherMutation = { __typename?: 'Mutation', updateTeacher: { __typename?: 'Teacher', id: number, name: string, longName: string, schoolId: number } };

export type DeleteTeacherMutationVariables = Exact<{
  deleteTeacherId: Scalars['Float'];
}>;


export type DeleteTeacherMutation = { __typename?: 'Mutation', deleteTeacher: { __typename?: 'Teacher', id: number, name: string, longName: string, schoolId: number } };

export type GetAdministeredTeachersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdministeredTeachersQuery = { __typename?: 'Query', getAdministeredSchool: { __typename?: 'School', teachers: Array<{ __typename?: 'Teacher', schoolId: number, name: string, longName: string, id: number }> } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: number, email: string, name: string, role: string } };

export type GetUserNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNameQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: number, name: string } };

export type UpdateUserMutationVariables = Exact<{
  userUpdateInput: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', email: string, name: string, id: number, role: string } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  resetPasswordInput: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type VerifyEmailMutationVariables = Exact<{
  verifyEmailInput: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: boolean };

export type DeleteOwnUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteOwnUserMutation = { __typename?: 'Mutation', deleteOwnUser: { __typename?: 'User', id: number } };

export type UpdateSchoolDataMutationVariables = Exact<{
  loginData: WebUntisImportInput;
}>;


export type UpdateSchoolDataMutation = { __typename?: 'Mutation', updateSchoolData: { __typename?: 'WebUntis', username: string } };


export const GetDepartmentByIdDocument = gql`
    query GetDepartmentById($getDepartmentByIdId: Float!) {
  getDepartmentById(id: $getDepartmentByIdId) {
    id
    longName
    name
    schoolClasses {
      longName
      name
      id
    }
  }
}
    `;

/**
 * __useGetDepartmentByIdQuery__
 *
 * To run a query within a React component, call `useGetDepartmentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDepartmentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDepartmentByIdQuery({
 *   variables: {
 *      getDepartmentByIdId: // value for 'getDepartmentByIdId'
 *   },
 * });
 */
export function useGetDepartmentByIdQuery(baseOptions: Apollo.QueryHookOptions<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>(GetDepartmentByIdDocument, options);
      }
export function useGetDepartmentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>(GetDepartmentByIdDocument, options);
        }
export type GetDepartmentByIdQueryHookResult = ReturnType<typeof useGetDepartmentByIdQuery>;
export type GetDepartmentByIdLazyQueryHookResult = ReturnType<typeof useGetDepartmentByIdLazyQuery>;
export type GetDepartmentByIdQueryResult = Apollo.QueryResult<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>;
export const CreateDepartmentDocument = gql`
    mutation CreateDepartment($departmentInput: DepartmentCreateInput!) {
  createDepartment(departmentInput: $departmentInput) {
    id
    name
    longName
  }
}
    `;
export type CreateDepartmentMutationFn = Apollo.MutationFunction<CreateDepartmentMutation, CreateDepartmentMutationVariables>;

/**
 * __useCreateDepartmentMutation__
 *
 * To run a mutation, you first call `useCreateDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDepartmentMutation, { data, loading, error }] = useCreateDepartmentMutation({
 *   variables: {
 *      departmentInput: // value for 'departmentInput'
 *   },
 * });
 */
export function useCreateDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateDepartmentMutation, CreateDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDepartmentMutation, CreateDepartmentMutationVariables>(CreateDepartmentDocument, options);
      }
export type CreateDepartmentMutationHookResult = ReturnType<typeof useCreateDepartmentMutation>;
export type CreateDepartmentMutationResult = Apollo.MutationResult<CreateDepartmentMutation>;
export type CreateDepartmentMutationOptions = Apollo.BaseMutationOptions<CreateDepartmentMutation, CreateDepartmentMutationVariables>;
export const UpdateDepartmentDocument = gql`
    mutation UpdateDepartment($departmentInput: DepartmentUpdateInput!) {
  updateDepartment(departmentInput: $departmentInput) {
    id
    name
    longName
  }
}
    `;
export type UpdateDepartmentMutationFn = Apollo.MutationFunction<UpdateDepartmentMutation, UpdateDepartmentMutationVariables>;

/**
 * __useUpdateDepartmentMutation__
 *
 * To run a mutation, you first call `useUpdateDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDepartmentMutation, { data, loading, error }] = useUpdateDepartmentMutation({
 *   variables: {
 *      departmentInput: // value for 'departmentInput'
 *   },
 * });
 */
export function useUpdateDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDepartmentMutation, UpdateDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDepartmentMutation, UpdateDepartmentMutationVariables>(UpdateDepartmentDocument, options);
      }
export type UpdateDepartmentMutationHookResult = ReturnType<typeof useUpdateDepartmentMutation>;
export type UpdateDepartmentMutationResult = Apollo.MutationResult<UpdateDepartmentMutation>;
export type UpdateDepartmentMutationOptions = Apollo.BaseMutationOptions<UpdateDepartmentMutation, UpdateDepartmentMutationVariables>;
export const DeleteDepartmentDocument = gql`
    mutation DeleteDepartment($deleteDepartmentId: Float!) {
  deleteDepartment(id: $deleteDepartmentId) {
    id
  }
}
    `;
export type DeleteDepartmentMutationFn = Apollo.MutationFunction<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>;

/**
 * __useDeleteDepartmentMutation__
 *
 * To run a mutation, you first call `useDeleteDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDepartmentMutation, { data, loading, error }] = useDeleteDepartmentMutation({
 *   variables: {
 *      deleteDepartmentId: // value for 'deleteDepartmentId'
 *   },
 * });
 */
export function useDeleteDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>(DeleteDepartmentDocument, options);
      }
export type DeleteDepartmentMutationHookResult = ReturnType<typeof useDeleteDepartmentMutation>;
export type DeleteDepartmentMutationResult = Apollo.MutationResult<DeleteDepartmentMutation>;
export type DeleteDepartmentMutationOptions = Apollo.BaseMutationOptions<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>;
export const GetMatchesOfCurrentUserDocument = gql`
    query GetMatchesOfCurrentUser {
  getMatchesOfCurrentUser {
    rating
    tutorOffering {
      id
      description
      grade
      schoolSubject {
        id
        name
        longName
      }
      studentId
      teacher {
        id
        longName
        name
        schoolId
      }
    }
    tutorRequest {
      description
      grade
      id
      schoolSubject {
        id
        longName
        name
      }
      studentId
      teacher {
        id
        longName
        name
        schoolId
      }
    }
  }
}
    `;

/**
 * __useGetMatchesOfCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetMatchesOfCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchesOfCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchesOfCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMatchesOfCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetMatchesOfCurrentUserQuery, GetMatchesOfCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchesOfCurrentUserQuery, GetMatchesOfCurrentUserQueryVariables>(GetMatchesOfCurrentUserDocument, options);
      }
export function useGetMatchesOfCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchesOfCurrentUserQuery, GetMatchesOfCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchesOfCurrentUserQuery, GetMatchesOfCurrentUserQueryVariables>(GetMatchesOfCurrentUserDocument, options);
        }
export type GetMatchesOfCurrentUserQueryHookResult = ReturnType<typeof useGetMatchesOfCurrentUserQuery>;
export type GetMatchesOfCurrentUserLazyQueryHookResult = ReturnType<typeof useGetMatchesOfCurrentUserLazyQuery>;
export type GetMatchesOfCurrentUserQueryResult = Apollo.QueryResult<GetMatchesOfCurrentUserQuery, GetMatchesOfCurrentUserQueryVariables>;
export const GetTutorOfferingByIdDocument = gql`
    query GetTutorOfferingById($getTutorOfferingByIdId: Float!) {
  getTutorOfferingById(id: $getTutorOfferingByIdId) {
    description
    grade
    id
    studentId
    schoolSubject {
      name
      longName
      id
    }
    teacher {
      id
      name
      schoolId
    }
  }
}
    `;

/**
 * __useGetTutorOfferingByIdQuery__
 *
 * To run a query within a React component, call `useGetTutorOfferingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTutorOfferingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTutorOfferingByIdQuery({
 *   variables: {
 *      getTutorOfferingByIdId: // value for 'getTutorOfferingByIdId'
 *   },
 * });
 */
export function useGetTutorOfferingByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTutorOfferingByIdQuery, GetTutorOfferingByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTutorOfferingByIdQuery, GetTutorOfferingByIdQueryVariables>(GetTutorOfferingByIdDocument, options);
      }
export function useGetTutorOfferingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTutorOfferingByIdQuery, GetTutorOfferingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTutorOfferingByIdQuery, GetTutorOfferingByIdQueryVariables>(GetTutorOfferingByIdDocument, options);
        }
export type GetTutorOfferingByIdQueryHookResult = ReturnType<typeof useGetTutorOfferingByIdQuery>;
export type GetTutorOfferingByIdLazyQueryHookResult = ReturnType<typeof useGetTutorOfferingByIdLazyQuery>;
export type GetTutorOfferingByIdQueryResult = Apollo.QueryResult<GetTutorOfferingByIdQuery, GetTutorOfferingByIdQueryVariables>;
export const CreateTutorOfferingDocument = gql`
    mutation CreateTutorOffering($tutorOfferingInputCreation: TutorOfferingInputCreation!) {
  createTutorOffering(TutorOfferingInputCreation: $tutorOfferingInputCreation) {
    description
    grade
    id
    schoolSubject {
      id
      longName
      name
    }
    teacher {
      schoolId
      id
      name
    }
  }
}
    `;
export type CreateTutorOfferingMutationFn = Apollo.MutationFunction<CreateTutorOfferingMutation, CreateTutorOfferingMutationVariables>;

/**
 * __useCreateTutorOfferingMutation__
 *
 * To run a mutation, you first call `useCreateTutorOfferingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTutorOfferingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTutorOfferingMutation, { data, loading, error }] = useCreateTutorOfferingMutation({
 *   variables: {
 *      tutorOfferingInputCreation: // value for 'tutorOfferingInputCreation'
 *   },
 * });
 */
export function useCreateTutorOfferingMutation(baseOptions?: Apollo.MutationHookOptions<CreateTutorOfferingMutation, CreateTutorOfferingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTutorOfferingMutation, CreateTutorOfferingMutationVariables>(CreateTutorOfferingDocument, options);
      }
export type CreateTutorOfferingMutationHookResult = ReturnType<typeof useCreateTutorOfferingMutation>;
export type CreateTutorOfferingMutationResult = Apollo.MutationResult<CreateTutorOfferingMutation>;
export type CreateTutorOfferingMutationOptions = Apollo.BaseMutationOptions<CreateTutorOfferingMutation, CreateTutorOfferingMutationVariables>;
export const UpdateTutorOfferingDocument = gql`
    mutation UpdateTutorOffering($tutorOfferingUpdateInput: TutorOfferingUpdateInput!) {
  updateTutorOffering(TutorOfferingUpdateInput: $tutorOfferingUpdateInput) {
    description
    grade
    id
    schoolSubject {
      id
      longName
      name
    }
    teacher {
      schoolId
      id
      name
    }
  }
}
    `;
export type UpdateTutorOfferingMutationFn = Apollo.MutationFunction<UpdateTutorOfferingMutation, UpdateTutorOfferingMutationVariables>;

/**
 * __useUpdateTutorOfferingMutation__
 *
 * To run a mutation, you first call `useUpdateTutorOfferingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTutorOfferingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTutorOfferingMutation, { data, loading, error }] = useUpdateTutorOfferingMutation({
 *   variables: {
 *      tutorOfferingUpdateInput: // value for 'tutorOfferingUpdateInput'
 *   },
 * });
 */
export function useUpdateTutorOfferingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTutorOfferingMutation, UpdateTutorOfferingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTutorOfferingMutation, UpdateTutorOfferingMutationVariables>(UpdateTutorOfferingDocument, options);
      }
export type UpdateTutorOfferingMutationHookResult = ReturnType<typeof useUpdateTutorOfferingMutation>;
export type UpdateTutorOfferingMutationResult = Apollo.MutationResult<UpdateTutorOfferingMutation>;
export type UpdateTutorOfferingMutationOptions = Apollo.BaseMutationOptions<UpdateTutorOfferingMutation, UpdateTutorOfferingMutationVariables>;
export const GetTutorRequestByIdDocument = gql`
    query GetTutorRequestById($getTutorRequestByIdId: Float!) {
  getTutorRequestById(id: $getTutorRequestByIdId) {
    description
    grade
    id
    schoolSubject {
      name
      longName
      id
    }
    teacher {
      schoolId
      name
      id
    }
  }
}
    `;

/**
 * __useGetTutorRequestByIdQuery__
 *
 * To run a query within a React component, call `useGetTutorRequestByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTutorRequestByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTutorRequestByIdQuery({
 *   variables: {
 *      getTutorRequestByIdId: // value for 'getTutorRequestByIdId'
 *   },
 * });
 */
export function useGetTutorRequestByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTutorRequestByIdQuery, GetTutorRequestByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTutorRequestByIdQuery, GetTutorRequestByIdQueryVariables>(GetTutorRequestByIdDocument, options);
      }
export function useGetTutorRequestByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTutorRequestByIdQuery, GetTutorRequestByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTutorRequestByIdQuery, GetTutorRequestByIdQueryVariables>(GetTutorRequestByIdDocument, options);
        }
export type GetTutorRequestByIdQueryHookResult = ReturnType<typeof useGetTutorRequestByIdQuery>;
export type GetTutorRequestByIdLazyQueryHookResult = ReturnType<typeof useGetTutorRequestByIdLazyQuery>;
export type GetTutorRequestByIdQueryResult = Apollo.QueryResult<GetTutorRequestByIdQuery, GetTutorRequestByIdQueryVariables>;
export const CreateTutorRequestDocument = gql`
    mutation CreateTutorRequest($tutorRequestCreationInput: TutorRequestCreationInput!) {
  createTutorRequest(TutorRequestCreationInput: $tutorRequestCreationInput) {
    description
    grade
    id
    schoolSubject {
      name
      longName
      id
    }
    teacher {
      schoolId
      name
      id
    }
  }
}
    `;
export type CreateTutorRequestMutationFn = Apollo.MutationFunction<CreateTutorRequestMutation, CreateTutorRequestMutationVariables>;

/**
 * __useCreateTutorRequestMutation__
 *
 * To run a mutation, you first call `useCreateTutorRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTutorRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTutorRequestMutation, { data, loading, error }] = useCreateTutorRequestMutation({
 *   variables: {
 *      tutorRequestCreationInput: // value for 'tutorRequestCreationInput'
 *   },
 * });
 */
export function useCreateTutorRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateTutorRequestMutation, CreateTutorRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTutorRequestMutation, CreateTutorRequestMutationVariables>(CreateTutorRequestDocument, options);
      }
export type CreateTutorRequestMutationHookResult = ReturnType<typeof useCreateTutorRequestMutation>;
export type CreateTutorRequestMutationResult = Apollo.MutationResult<CreateTutorRequestMutation>;
export type CreateTutorRequestMutationOptions = Apollo.BaseMutationOptions<CreateTutorRequestMutation, CreateTutorRequestMutationVariables>;
export const UpdateTutorRequestDocument = gql`
    mutation UpdateTutorRequest($tutorRequestUpdateInput: TutorRequestUpdateInput!) {
  updateTutorRequest(TutorRequestUpdateInput: $tutorRequestUpdateInput) {
    description
    grade
    id
    schoolSubject {
      name
      longName
      id
    }
    teacher {
      schoolId
      name
      id
    }
  }
}
    `;
export type UpdateTutorRequestMutationFn = Apollo.MutationFunction<UpdateTutorRequestMutation, UpdateTutorRequestMutationVariables>;

/**
 * __useUpdateTutorRequestMutation__
 *
 * To run a mutation, you first call `useUpdateTutorRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTutorRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTutorRequestMutation, { data, loading, error }] = useUpdateTutorRequestMutation({
 *   variables: {
 *      tutorRequestUpdateInput: // value for 'tutorRequestUpdateInput'
 *   },
 * });
 */
export function useUpdateTutorRequestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTutorRequestMutation, UpdateTutorRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTutorRequestMutation, UpdateTutorRequestMutationVariables>(UpdateTutorRequestDocument, options);
      }
export type UpdateTutorRequestMutationHookResult = ReturnType<typeof useUpdateTutorRequestMutation>;
export type UpdateTutorRequestMutationResult = Apollo.MutationResult<UpdateTutorRequestMutation>;
export type UpdateTutorRequestMutationOptions = Apollo.BaseMutationOptions<UpdateTutorRequestMutation, UpdateTutorRequestMutationVariables>;
export const GetSchoolByIdDocument = gql`
    query GetSchoolById($getSchoolByIdId: Float!) {
  getSchoolById(id: $getSchoolByIdId) {
    domain
    id
    name
    departments {
      longName
      name
      id
    }
  }
}
    `;

/**
 * __useGetSchoolByIdQuery__
 *
 * To run a query within a React component, call `useGetSchoolByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolByIdQuery({
 *   variables: {
 *      getSchoolByIdId: // value for 'getSchoolByIdId'
 *   },
 * });
 */
export function useGetSchoolByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>(GetSchoolByIdDocument, options);
      }
export function useGetSchoolByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>(GetSchoolByIdDocument, options);
        }
export type GetSchoolByIdQueryHookResult = ReturnType<typeof useGetSchoolByIdQuery>;
export type GetSchoolByIdLazyQueryHookResult = ReturnType<typeof useGetSchoolByIdLazyQuery>;
export type GetSchoolByIdQueryResult = Apollo.QueryResult<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>;
export const GetAdministeredSchoolDocument = gql`
    query GetAdministeredSchool {
  getAdministeredSchool {
    name
    domain
    id
  }
}
    `;

/**
 * __useGetAdministeredSchoolQuery__
 *
 * To run a query within a React component, call `useGetAdministeredSchoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdministeredSchoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdministeredSchoolQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdministeredSchoolQuery(baseOptions?: Apollo.QueryHookOptions<GetAdministeredSchoolQuery, GetAdministeredSchoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdministeredSchoolQuery, GetAdministeredSchoolQueryVariables>(GetAdministeredSchoolDocument, options);
      }
export function useGetAdministeredSchoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdministeredSchoolQuery, GetAdministeredSchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdministeredSchoolQuery, GetAdministeredSchoolQueryVariables>(GetAdministeredSchoolDocument, options);
        }
export type GetAdministeredSchoolQueryHookResult = ReturnType<typeof useGetAdministeredSchoolQuery>;
export type GetAdministeredSchoolLazyQueryHookResult = ReturnType<typeof useGetAdministeredSchoolLazyQuery>;
export type GetAdministeredSchoolQueryResult = Apollo.QueryResult<GetAdministeredSchoolQuery, GetAdministeredSchoolQueryVariables>;
export const CreateSchoolDocument = gql`
    mutation CreateSchool($schoolCreationInput: SchoolCreationInput!) {
  createSchool(schoolCreationInput: $schoolCreationInput) {
    id
    name
    domain
  }
}
    `;
export type CreateSchoolMutationFn = Apollo.MutationFunction<CreateSchoolMutation, CreateSchoolMutationVariables>;

/**
 * __useCreateSchoolMutation__
 *
 * To run a mutation, you first call `useCreateSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSchoolMutation, { data, loading, error }] = useCreateSchoolMutation({
 *   variables: {
 *      schoolCreationInput: // value for 'schoolCreationInput'
 *   },
 * });
 */
export function useCreateSchoolMutation(baseOptions?: Apollo.MutationHookOptions<CreateSchoolMutation, CreateSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSchoolMutation, CreateSchoolMutationVariables>(CreateSchoolDocument, options);
      }
export type CreateSchoolMutationHookResult = ReturnType<typeof useCreateSchoolMutation>;
export type CreateSchoolMutationResult = Apollo.MutationResult<CreateSchoolMutation>;
export type CreateSchoolMutationOptions = Apollo.BaseMutationOptions<CreateSchoolMutation, CreateSchoolMutationVariables>;
export const UpdateSchoolDocument = gql`
    mutation UpdateSchool($schoolUpdateInput: SchoolUpdateInput!) {
  updateSchool(schoolUpdateInput: $schoolUpdateInput) {
    id
    name
    domain
  }
}
    `;
export type UpdateSchoolMutationFn = Apollo.MutationFunction<UpdateSchoolMutation, UpdateSchoolMutationVariables>;

/**
 * __useUpdateSchoolMutation__
 *
 * To run a mutation, you first call `useUpdateSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchoolMutation, { data, loading, error }] = useUpdateSchoolMutation({
 *   variables: {
 *      schoolUpdateInput: // value for 'schoolUpdateInput'
 *   },
 * });
 */
export function useUpdateSchoolMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSchoolMutation, UpdateSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSchoolMutation, UpdateSchoolMutationVariables>(UpdateSchoolDocument, options);
      }
export type UpdateSchoolMutationHookResult = ReturnType<typeof useUpdateSchoolMutation>;
export type UpdateSchoolMutationResult = Apollo.MutationResult<UpdateSchoolMutation>;
export type UpdateSchoolMutationOptions = Apollo.BaseMutationOptions<UpdateSchoolMutation, UpdateSchoolMutationVariables>;
export const GetSchoolClassesOfSchoolDocument = gql`
    query GetSchoolClassesOfSchool {
  getSchoolClassesOfSchool {
    longName
    name
    id
  }
}
    `;

/**
 * __useGetSchoolClassesOfSchoolQuery__
 *
 * To run a query within a React component, call `useGetSchoolClassesOfSchoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolClassesOfSchoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolClassesOfSchoolQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSchoolClassesOfSchoolQuery(baseOptions?: Apollo.QueryHookOptions<GetSchoolClassesOfSchoolQuery, GetSchoolClassesOfSchoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSchoolClassesOfSchoolQuery, GetSchoolClassesOfSchoolQueryVariables>(GetSchoolClassesOfSchoolDocument, options);
      }
export function useGetSchoolClassesOfSchoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchoolClassesOfSchoolQuery, GetSchoolClassesOfSchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSchoolClassesOfSchoolQuery, GetSchoolClassesOfSchoolQueryVariables>(GetSchoolClassesOfSchoolDocument, options);
        }
export type GetSchoolClassesOfSchoolQueryHookResult = ReturnType<typeof useGetSchoolClassesOfSchoolQuery>;
export type GetSchoolClassesOfSchoolLazyQueryHookResult = ReturnType<typeof useGetSchoolClassesOfSchoolLazyQuery>;
export type GetSchoolClassesOfSchoolQueryResult = Apollo.QueryResult<GetSchoolClassesOfSchoolQuery, GetSchoolClassesOfSchoolQueryVariables>;
export const GetSchoolClassByIdDocument = gql`
    query GetSchoolClassById($getSchoolClassByIdId: Float!) {
  getSchoolClassById(id: $getSchoolClassByIdId) {
    id
    name
    longName
  }
}
    `;

/**
 * __useGetSchoolClassByIdQuery__
 *
 * To run a query within a React component, call `useGetSchoolClassByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolClassByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolClassByIdQuery({
 *   variables: {
 *      getSchoolClassByIdId: // value for 'getSchoolClassByIdId'
 *   },
 * });
 */
export function useGetSchoolClassByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSchoolClassByIdQuery, GetSchoolClassByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSchoolClassByIdQuery, GetSchoolClassByIdQueryVariables>(GetSchoolClassByIdDocument, options);
      }
export function useGetSchoolClassByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchoolClassByIdQuery, GetSchoolClassByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSchoolClassByIdQuery, GetSchoolClassByIdQueryVariables>(GetSchoolClassByIdDocument, options);
        }
export type GetSchoolClassByIdQueryHookResult = ReturnType<typeof useGetSchoolClassByIdQuery>;
export type GetSchoolClassByIdLazyQueryHookResult = ReturnType<typeof useGetSchoolClassByIdLazyQuery>;
export type GetSchoolClassByIdQueryResult = Apollo.QueryResult<GetSchoolClassByIdQuery, GetSchoolClassByIdQueryVariables>;
export const CreateSchoolClassDocument = gql`
    mutation CreateSchoolClass($schoolClassCreateInput: SchoolClassCreationInput!) {
  createSchoolClass(schoolClassCreateInput: $schoolClassCreateInput) {
    id
    name
    longName
  }
}
    `;
export type CreateSchoolClassMutationFn = Apollo.MutationFunction<CreateSchoolClassMutation, CreateSchoolClassMutationVariables>;

/**
 * __useCreateSchoolClassMutation__
 *
 * To run a mutation, you first call `useCreateSchoolClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSchoolClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSchoolClassMutation, { data, loading, error }] = useCreateSchoolClassMutation({
 *   variables: {
 *      schoolClassCreateInput: // value for 'schoolClassCreateInput'
 *   },
 * });
 */
export function useCreateSchoolClassMutation(baseOptions?: Apollo.MutationHookOptions<CreateSchoolClassMutation, CreateSchoolClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSchoolClassMutation, CreateSchoolClassMutationVariables>(CreateSchoolClassDocument, options);
      }
export type CreateSchoolClassMutationHookResult = ReturnType<typeof useCreateSchoolClassMutation>;
export type CreateSchoolClassMutationResult = Apollo.MutationResult<CreateSchoolClassMutation>;
export type CreateSchoolClassMutationOptions = Apollo.BaseMutationOptions<CreateSchoolClassMutation, CreateSchoolClassMutationVariables>;
export const UpdateSchoolClassDocument = gql`
    mutation UpdateSchoolClass($schoolClassUpdateInput: SchoolClassUpdateInput!) {
  updateSchoolClass(schoolClassUpdateInput: $schoolClassUpdateInput) {
    id
    name
    longName
  }
}
    `;
export type UpdateSchoolClassMutationFn = Apollo.MutationFunction<UpdateSchoolClassMutation, UpdateSchoolClassMutationVariables>;

/**
 * __useUpdateSchoolClassMutation__
 *
 * To run a mutation, you first call `useUpdateSchoolClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchoolClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchoolClassMutation, { data, loading, error }] = useUpdateSchoolClassMutation({
 *   variables: {
 *      schoolClassUpdateInput: // value for 'schoolClassUpdateInput'
 *   },
 * });
 */
export function useUpdateSchoolClassMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSchoolClassMutation, UpdateSchoolClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSchoolClassMutation, UpdateSchoolClassMutationVariables>(UpdateSchoolClassDocument, options);
      }
export type UpdateSchoolClassMutationHookResult = ReturnType<typeof useUpdateSchoolClassMutation>;
export type UpdateSchoolClassMutationResult = Apollo.MutationResult<UpdateSchoolClassMutation>;
export type UpdateSchoolClassMutationOptions = Apollo.BaseMutationOptions<UpdateSchoolClassMutation, UpdateSchoolClassMutationVariables>;
export const DeleteSchoolClassDocument = gql`
    mutation DeleteSchoolClass($deleteSchoolClassId: Float!) {
  deleteSchoolClass(id: $deleteSchoolClassId) {
    id
  }
}
    `;
export type DeleteSchoolClassMutationFn = Apollo.MutationFunction<DeleteSchoolClassMutation, DeleteSchoolClassMutationVariables>;

/**
 * __useDeleteSchoolClassMutation__
 *
 * To run a mutation, you first call `useDeleteSchoolClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSchoolClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSchoolClassMutation, { data, loading, error }] = useDeleteSchoolClassMutation({
 *   variables: {
 *      deleteSchoolClassId: // value for 'deleteSchoolClassId'
 *   },
 * });
 */
export function useDeleteSchoolClassMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSchoolClassMutation, DeleteSchoolClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSchoolClassMutation, DeleteSchoolClassMutationVariables>(DeleteSchoolClassDocument, options);
      }
export type DeleteSchoolClassMutationHookResult = ReturnType<typeof useDeleteSchoolClassMutation>;
export type DeleteSchoolClassMutationResult = Apollo.MutationResult<DeleteSchoolClassMutation>;
export type DeleteSchoolClassMutationOptions = Apollo.BaseMutationOptions<DeleteSchoolClassMutation, DeleteSchoolClassMutationVariables>;
export const GetSchoolSubjectByIdDocument = gql`
    query GetSchoolSubjectById($getSchoolSubjectByIdId: Float!) {
  getSchoolSubjectById(id: $getSchoolSubjectByIdId) {
    id
    longName
    name
  }
}
    `;

/**
 * __useGetSchoolSubjectByIdQuery__
 *
 * To run a query within a React component, call `useGetSchoolSubjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolSubjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolSubjectByIdQuery({
 *   variables: {
 *      getSchoolSubjectByIdId: // value for 'getSchoolSubjectByIdId'
 *   },
 * });
 */
export function useGetSchoolSubjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSchoolSubjectByIdQuery, GetSchoolSubjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSchoolSubjectByIdQuery, GetSchoolSubjectByIdQueryVariables>(GetSchoolSubjectByIdDocument, options);
      }
export function useGetSchoolSubjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchoolSubjectByIdQuery, GetSchoolSubjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSchoolSubjectByIdQuery, GetSchoolSubjectByIdQueryVariables>(GetSchoolSubjectByIdDocument, options);
        }
export type GetSchoolSubjectByIdQueryHookResult = ReturnType<typeof useGetSchoolSubjectByIdQuery>;
export type GetSchoolSubjectByIdLazyQueryHookResult = ReturnType<typeof useGetSchoolSubjectByIdLazyQuery>;
export type GetSchoolSubjectByIdQueryResult = Apollo.QueryResult<GetSchoolSubjectByIdQuery, GetSchoolSubjectByIdQueryVariables>;
export const CreateSchoolSubjectDocument = gql`
    mutation CreateSchoolSubject($schoolSubjectCreationInput: SchoolSubjectCreationInput!) {
  createSchoolSubject(SchoolSubjectCreationInput: $schoolSubjectCreationInput) {
    id
    longName
    name
  }
}
    `;
export type CreateSchoolSubjectMutationFn = Apollo.MutationFunction<CreateSchoolSubjectMutation, CreateSchoolSubjectMutationVariables>;

/**
 * __useCreateSchoolSubjectMutation__
 *
 * To run a mutation, you first call `useCreateSchoolSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSchoolSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSchoolSubjectMutation, { data, loading, error }] = useCreateSchoolSubjectMutation({
 *   variables: {
 *      schoolSubjectCreationInput: // value for 'schoolSubjectCreationInput'
 *   },
 * });
 */
export function useCreateSchoolSubjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateSchoolSubjectMutation, CreateSchoolSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSchoolSubjectMutation, CreateSchoolSubjectMutationVariables>(CreateSchoolSubjectDocument, options);
      }
export type CreateSchoolSubjectMutationHookResult = ReturnType<typeof useCreateSchoolSubjectMutation>;
export type CreateSchoolSubjectMutationResult = Apollo.MutationResult<CreateSchoolSubjectMutation>;
export type CreateSchoolSubjectMutationOptions = Apollo.BaseMutationOptions<CreateSchoolSubjectMutation, CreateSchoolSubjectMutationVariables>;
export const UpdateSchoolSubjectDocument = gql`
    mutation UpdateSchoolSubject($schoolSubjectUpdateInput: SchoolSubjectUpdateInput!) {
  updateSchoolSubject(SchoolSubjectUpdateInput: $schoolSubjectUpdateInput) {
    id
    longName
    name
  }
}
    `;
export type UpdateSchoolSubjectMutationFn = Apollo.MutationFunction<UpdateSchoolSubjectMutation, UpdateSchoolSubjectMutationVariables>;

/**
 * __useUpdateSchoolSubjectMutation__
 *
 * To run a mutation, you first call `useUpdateSchoolSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchoolSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchoolSubjectMutation, { data, loading, error }] = useUpdateSchoolSubjectMutation({
 *   variables: {
 *      schoolSubjectUpdateInput: // value for 'schoolSubjectUpdateInput'
 *   },
 * });
 */
export function useUpdateSchoolSubjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSchoolSubjectMutation, UpdateSchoolSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSchoolSubjectMutation, UpdateSchoolSubjectMutationVariables>(UpdateSchoolSubjectDocument, options);
      }
export type UpdateSchoolSubjectMutationHookResult = ReturnType<typeof useUpdateSchoolSubjectMutation>;
export type UpdateSchoolSubjectMutationResult = Apollo.MutationResult<UpdateSchoolSubjectMutation>;
export type UpdateSchoolSubjectMutationOptions = Apollo.BaseMutationOptions<UpdateSchoolSubjectMutation, UpdateSchoolSubjectMutationVariables>;
export const DeleteSchoolSubjectDocument = gql`
    mutation DeleteSchoolSubject($deleteSchoolSubjectId: Float!) {
  deleteSchoolSubject(id: $deleteSchoolSubjectId) {
    id
  }
}
    `;
export type DeleteSchoolSubjectMutationFn = Apollo.MutationFunction<DeleteSchoolSubjectMutation, DeleteSchoolSubjectMutationVariables>;

/**
 * __useDeleteSchoolSubjectMutation__
 *
 * To run a mutation, you first call `useDeleteSchoolSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSchoolSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSchoolSubjectMutation, { data, loading, error }] = useDeleteSchoolSubjectMutation({
 *   variables: {
 *      deleteSchoolSubjectId: // value for 'deleteSchoolSubjectId'
 *   },
 * });
 */
export function useDeleteSchoolSubjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSchoolSubjectMutation, DeleteSchoolSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSchoolSubjectMutation, DeleteSchoolSubjectMutationVariables>(DeleteSchoolSubjectDocument, options);
      }
export type DeleteSchoolSubjectMutationHookResult = ReturnType<typeof useDeleteSchoolSubjectMutation>;
export type DeleteSchoolSubjectMutationResult = Apollo.MutationResult<DeleteSchoolSubjectMutation>;
export type DeleteSchoolSubjectMutationOptions = Apollo.BaseMutationOptions<DeleteSchoolSubjectMutation, DeleteSchoolSubjectMutationVariables>;
export const GetAdministeredSchoolSubjectsDocument = gql`
    query GetAdministeredSchoolSubjects {
  getAdministeredSchool {
    schoolSubjects {
      id
      longName
      name
    }
  }
}
    `;

/**
 * __useGetAdministeredSchoolSubjectsQuery__
 *
 * To run a query within a React component, call `useGetAdministeredSchoolSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdministeredSchoolSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdministeredSchoolSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdministeredSchoolSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdministeredSchoolSubjectsQuery, GetAdministeredSchoolSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdministeredSchoolSubjectsQuery, GetAdministeredSchoolSubjectsQueryVariables>(GetAdministeredSchoolSubjectsDocument, options);
      }
export function useGetAdministeredSchoolSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdministeredSchoolSubjectsQuery, GetAdministeredSchoolSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdministeredSchoolSubjectsQuery, GetAdministeredSchoolSubjectsQueryVariables>(GetAdministeredSchoolSubjectsDocument, options);
        }
export type GetAdministeredSchoolSubjectsQueryHookResult = ReturnType<typeof useGetAdministeredSchoolSubjectsQuery>;
export type GetAdministeredSchoolSubjectsLazyQueryHookResult = ReturnType<typeof useGetAdministeredSchoolSubjectsLazyQuery>;
export type GetAdministeredSchoolSubjectsQueryResult = Apollo.QueryResult<GetAdministeredSchoolSubjectsQuery, GetAdministeredSchoolSubjectsQueryVariables>;
export const GetStudentByIdDocument = gql`
    query getStudentById($getStudentByIdId: Float!) {
  getStudentById(id: $getStudentByIdId) {
    id
    user {
      email
      name
      firstName
      lastName
    }
    schoolClassId
  }
}
    `;

/**
 * __useGetStudentByIdQuery__
 *
 * To run a query within a React component, call `useGetStudentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentByIdQuery({
 *   variables: {
 *      getStudentByIdId: // value for 'getStudentByIdId'
 *   },
 * });
 */
export function useGetStudentByIdQuery(baseOptions: Apollo.QueryHookOptions<GetStudentByIdQuery, GetStudentByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentByIdQuery, GetStudentByIdQueryVariables>(GetStudentByIdDocument, options);
      }
export function useGetStudentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentByIdQuery, GetStudentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentByIdQuery, GetStudentByIdQueryVariables>(GetStudentByIdDocument, options);
        }
export type GetStudentByIdQueryHookResult = ReturnType<typeof useGetStudentByIdQuery>;
export type GetStudentByIdLazyQueryHookResult = ReturnType<typeof useGetStudentByIdLazyQuery>;
export type GetStudentByIdQueryResult = Apollo.QueryResult<GetStudentByIdQuery, GetStudentByIdQueryVariables>;
export const CreateStudentDocument = gql`
    mutation createStudent($studentInput: StudentCreationInput!) {
  createStudent(studentInput: $studentInput) {
    id
    user {
      email
      name
      firstName
      lastName
    }
    schoolClassId
  }
}
    `;
export type CreateStudentMutationFn = Apollo.MutationFunction<CreateStudentMutation, CreateStudentMutationVariables>;

/**
 * __useCreateStudentMutation__
 *
 * To run a mutation, you first call `useCreateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentMutation, { data, loading, error }] = useCreateStudentMutation({
 *   variables: {
 *      studentInput: // value for 'studentInput'
 *   },
 * });
 */
export function useCreateStudentMutation(baseOptions?: Apollo.MutationHookOptions<CreateStudentMutation, CreateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument, options);
      }
export type CreateStudentMutationHookResult = ReturnType<typeof useCreateStudentMutation>;
export type CreateStudentMutationResult = Apollo.MutationResult<CreateStudentMutation>;
export type CreateStudentMutationOptions = Apollo.BaseMutationOptions<CreateStudentMutation, CreateStudentMutationVariables>;
export const UpdateStudentDocument = gql`
    mutation updateStudent($studentInput: StudentUpdateInput!) {
  updateStudent(studentInput: $studentInput) {
    id
    user {
      email
      name
      firstName
      lastName
    }
    schoolClassId
  }
}
    `;
export type UpdateStudentMutationFn = Apollo.MutationFunction<UpdateStudentMutation, UpdateStudentMutationVariables>;

/**
 * __useUpdateStudentMutation__
 *
 * To run a mutation, you first call `useUpdateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentMutation, { data, loading, error }] = useUpdateStudentMutation({
 *   variables: {
 *      studentInput: // value for 'studentInput'
 *   },
 * });
 */
export function useUpdateStudentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStudentMutation, UpdateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStudentMutation, UpdateStudentMutationVariables>(UpdateStudentDocument, options);
      }
export type UpdateStudentMutationHookResult = ReturnType<typeof useUpdateStudentMutation>;
export type UpdateStudentMutationResult = Apollo.MutationResult<UpdateStudentMutation>;
export type UpdateStudentMutationOptions = Apollo.BaseMutationOptions<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const DeleteStudentDocument = gql`
    mutation DeleteStudent($deleteStudentId: Float!) {
  deleteStudent(id: $deleteStudentId) {
    id
  }
}
    `;
export type DeleteStudentMutationFn = Apollo.MutationFunction<DeleteStudentMutation, DeleteStudentMutationVariables>;

/**
 * __useDeleteStudentMutation__
 *
 * To run a mutation, you first call `useDeleteStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudentMutation, { data, loading, error }] = useDeleteStudentMutation({
 *   variables: {
 *      deleteStudentId: // value for 'deleteStudentId'
 *   },
 * });
 */
export function useDeleteStudentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStudentMutation, DeleteStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStudentMutation, DeleteStudentMutationVariables>(DeleteStudentDocument, options);
      }
export type DeleteStudentMutationHookResult = ReturnType<typeof useDeleteStudentMutation>;
export type DeleteStudentMutationResult = Apollo.MutationResult<DeleteStudentMutation>;
export type DeleteStudentMutationOptions = Apollo.BaseMutationOptions<DeleteStudentMutation, DeleteStudentMutationVariables>;
export const GetStudentOfCurrentUserDocument = gql`
    query GetStudentOfCurrentUser {
  getStudentOfCurrentUser {
    tutorOfferings {
      description
      grade
      id
      schoolSubject {
        name
        longName
        id
      }
      teacher {
        name
        longName
        id
      }
    }
    tutorRequests {
      description
      grade
      id
      schoolSubject {
        name
        longName
        id
      }
      teacher {
        schoolId
        name
        longName
        id
      }
    }
    id
    user {
      email
      id
      name
    }
    schoolClassId
  }
}
    `;

/**
 * __useGetStudentOfCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetStudentOfCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentOfCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentOfCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStudentOfCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetStudentOfCurrentUserQuery, GetStudentOfCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentOfCurrentUserQuery, GetStudentOfCurrentUserQueryVariables>(GetStudentOfCurrentUserDocument, options);
      }
export function useGetStudentOfCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentOfCurrentUserQuery, GetStudentOfCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentOfCurrentUserQuery, GetStudentOfCurrentUserQueryVariables>(GetStudentOfCurrentUserDocument, options);
        }
export type GetStudentOfCurrentUserQueryHookResult = ReturnType<typeof useGetStudentOfCurrentUserQuery>;
export type GetStudentOfCurrentUserLazyQueryHookResult = ReturnType<typeof useGetStudentOfCurrentUserLazyQuery>;
export type GetStudentOfCurrentUserQueryResult = Apollo.QueryResult<GetStudentOfCurrentUserQuery, GetStudentOfCurrentUserQueryVariables>;
export const GetSubjectsOfStudentDocument = gql`
    query getSubjectsOfStudent {
  getSubjectsOfStudent {
    id
    longName
    name
  }
}
    `;

/**
 * __useGetSubjectsOfStudentQuery__
 *
 * To run a query within a React component, call `useGetSubjectsOfStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectsOfStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectsOfStudentQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubjectsOfStudentQuery(baseOptions?: Apollo.QueryHookOptions<GetSubjectsOfStudentQuery, GetSubjectsOfStudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectsOfStudentQuery, GetSubjectsOfStudentQueryVariables>(GetSubjectsOfStudentDocument, options);
      }
export function useGetSubjectsOfStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectsOfStudentQuery, GetSubjectsOfStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectsOfStudentQuery, GetSubjectsOfStudentQueryVariables>(GetSubjectsOfStudentDocument, options);
        }
export type GetSubjectsOfStudentQueryHookResult = ReturnType<typeof useGetSubjectsOfStudentQuery>;
export type GetSubjectsOfStudentLazyQueryHookResult = ReturnType<typeof useGetSubjectsOfStudentLazyQuery>;
export type GetSubjectsOfStudentQueryResult = Apollo.QueryResult<GetSubjectsOfStudentQuery, GetSubjectsOfStudentQueryVariables>;
export const GetTeachersOfStudentDocument = gql`
    query GetTeachersOfStudent {
  getTeachersOfStudent {
    name
    schoolId
    id
  }
}
    `;

/**
 * __useGetTeachersOfStudentQuery__
 *
 * To run a query within a React component, call `useGetTeachersOfStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeachersOfStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeachersOfStudentQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeachersOfStudentQuery(baseOptions?: Apollo.QueryHookOptions<GetTeachersOfStudentQuery, GetTeachersOfStudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeachersOfStudentQuery, GetTeachersOfStudentQueryVariables>(GetTeachersOfStudentDocument, options);
      }
export function useGetTeachersOfStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeachersOfStudentQuery, GetTeachersOfStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeachersOfStudentQuery, GetTeachersOfStudentQueryVariables>(GetTeachersOfStudentDocument, options);
        }
export type GetTeachersOfStudentQueryHookResult = ReturnType<typeof useGetTeachersOfStudentQuery>;
export type GetTeachersOfStudentLazyQueryHookResult = ReturnType<typeof useGetTeachersOfStudentLazyQuery>;
export type GetTeachersOfStudentQueryResult = Apollo.QueryResult<GetTeachersOfStudentQuery, GetTeachersOfStudentQueryVariables>;
export const GetAdministeredStudentsDocument = gql`
    query GetAdministeredStudents {
  getAdministeredSchool {
    departments {
      schoolClasses {
        students {
          id
          user {
            name
            id
            email
          }
          schoolClassId
        }
        departmentId
        name
      }
      name
    }
  }
}
    `;

/**
 * __useGetAdministeredStudentsQuery__
 *
 * To run a query within a React component, call `useGetAdministeredStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdministeredStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdministeredStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdministeredStudentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdministeredStudentsQuery, GetAdministeredStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdministeredStudentsQuery, GetAdministeredStudentsQueryVariables>(GetAdministeredStudentsDocument, options);
      }
export function useGetAdministeredStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdministeredStudentsQuery, GetAdministeredStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdministeredStudentsQuery, GetAdministeredStudentsQueryVariables>(GetAdministeredStudentsDocument, options);
        }
export type GetAdministeredStudentsQueryHookResult = ReturnType<typeof useGetAdministeredStudentsQuery>;
export type GetAdministeredStudentsLazyQueryHookResult = ReturnType<typeof useGetAdministeredStudentsLazyQuery>;
export type GetAdministeredStudentsQueryResult = Apollo.QueryResult<GetAdministeredStudentsQuery, GetAdministeredStudentsQueryVariables>;
export const GetTeacherByIdDocument = gql`
    query GetTeacherById($getTeacherByIdId: Float!) {
  getTeacherById(id: $getTeacherByIdId) {
    id
    name
    longName
    schoolId
  }
}
    `;

/**
 * __useGetTeacherByIdQuery__
 *
 * To run a query within a React component, call `useGetTeacherByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeacherByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeacherByIdQuery({
 *   variables: {
 *      getTeacherByIdId: // value for 'getTeacherByIdId'
 *   },
 * });
 */
export function useGetTeacherByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTeacherByIdQuery, GetTeacherByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeacherByIdQuery, GetTeacherByIdQueryVariables>(GetTeacherByIdDocument, options);
      }
export function useGetTeacherByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeacherByIdQuery, GetTeacherByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeacherByIdQuery, GetTeacherByIdQueryVariables>(GetTeacherByIdDocument, options);
        }
export type GetTeacherByIdQueryHookResult = ReturnType<typeof useGetTeacherByIdQuery>;
export type GetTeacherByIdLazyQueryHookResult = ReturnType<typeof useGetTeacherByIdLazyQuery>;
export type GetTeacherByIdQueryResult = Apollo.QueryResult<GetTeacherByIdQuery, GetTeacherByIdQueryVariables>;
export const CreateTeacherDocument = gql`
    mutation CreateTeacher($teacherCreationInput: TeacherCreationInput!) {
  createTeacher(teacherCreationInput: $teacherCreationInput) {
    id
    name
    longName
    schoolId
  }
}
    `;
export type CreateTeacherMutationFn = Apollo.MutationFunction<CreateTeacherMutation, CreateTeacherMutationVariables>;

/**
 * __useCreateTeacherMutation__
 *
 * To run a mutation, you first call `useCreateTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeacherMutation, { data, loading, error }] = useCreateTeacherMutation({
 *   variables: {
 *      teacherCreationInput: // value for 'teacherCreationInput'
 *   },
 * });
 */
export function useCreateTeacherMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeacherMutation, CreateTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeacherMutation, CreateTeacherMutationVariables>(CreateTeacherDocument, options);
      }
export type CreateTeacherMutationHookResult = ReturnType<typeof useCreateTeacherMutation>;
export type CreateTeacherMutationResult = Apollo.MutationResult<CreateTeacherMutation>;
export type CreateTeacherMutationOptions = Apollo.BaseMutationOptions<CreateTeacherMutation, CreateTeacherMutationVariables>;
export const UpdateTeacherDocument = gql`
    mutation UpdateTeacher($teacherUpdateInput: TeacherUpdateInput!) {
  updateTeacher(teacherUpdateInput: $teacherUpdateInput) {
    id
    name
    longName
    schoolId
  }
}
    `;
export type UpdateTeacherMutationFn = Apollo.MutationFunction<UpdateTeacherMutation, UpdateTeacherMutationVariables>;

/**
 * __useUpdateTeacherMutation__
 *
 * To run a mutation, you first call `useUpdateTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeacherMutation, { data, loading, error }] = useUpdateTeacherMutation({
 *   variables: {
 *      teacherUpdateInput: // value for 'teacherUpdateInput'
 *   },
 * });
 */
export function useUpdateTeacherMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeacherMutation, UpdateTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeacherMutation, UpdateTeacherMutationVariables>(UpdateTeacherDocument, options);
      }
export type UpdateTeacherMutationHookResult = ReturnType<typeof useUpdateTeacherMutation>;
export type UpdateTeacherMutationResult = Apollo.MutationResult<UpdateTeacherMutation>;
export type UpdateTeacherMutationOptions = Apollo.BaseMutationOptions<UpdateTeacherMutation, UpdateTeacherMutationVariables>;
export const DeleteTeacherDocument = gql`
    mutation DeleteTeacher($deleteTeacherId: Float!) {
  deleteTeacher(id: $deleteTeacherId) {
    id
    name
    longName
    schoolId
  }
}
    `;
export type DeleteTeacherMutationFn = Apollo.MutationFunction<DeleteTeacherMutation, DeleteTeacherMutationVariables>;

/**
 * __useDeleteTeacherMutation__
 *
 * To run a mutation, you first call `useDeleteTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeacherMutation, { data, loading, error }] = useDeleteTeacherMutation({
 *   variables: {
 *      deleteTeacherId: // value for 'deleteTeacherId'
 *   },
 * });
 */
export function useDeleteTeacherMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeacherMutation, DeleteTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeacherMutation, DeleteTeacherMutationVariables>(DeleteTeacherDocument, options);
      }
export type DeleteTeacherMutationHookResult = ReturnType<typeof useDeleteTeacherMutation>;
export type DeleteTeacherMutationResult = Apollo.MutationResult<DeleteTeacherMutation>;
export type DeleteTeacherMutationOptions = Apollo.BaseMutationOptions<DeleteTeacherMutation, DeleteTeacherMutationVariables>;
export const GetAdministeredTeachersDocument = gql`
    query GetAdministeredTeachers {
  getAdministeredSchool {
    teachers {
      schoolId
      name
      longName
      id
    }
  }
}
    `;

/**
 * __useGetAdministeredTeachersQuery__
 *
 * To run a query within a React component, call `useGetAdministeredTeachersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdministeredTeachersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdministeredTeachersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdministeredTeachersQuery(baseOptions?: Apollo.QueryHookOptions<GetAdministeredTeachersQuery, GetAdministeredTeachersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdministeredTeachersQuery, GetAdministeredTeachersQueryVariables>(GetAdministeredTeachersDocument, options);
      }
export function useGetAdministeredTeachersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdministeredTeachersQuery, GetAdministeredTeachersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdministeredTeachersQuery, GetAdministeredTeachersQueryVariables>(GetAdministeredTeachersDocument, options);
        }
export type GetAdministeredTeachersQueryHookResult = ReturnType<typeof useGetAdministeredTeachersQuery>;
export type GetAdministeredTeachersLazyQueryHookResult = ReturnType<typeof useGetAdministeredTeachersLazyQuery>;
export type GetAdministeredTeachersQueryResult = Apollo.QueryResult<GetAdministeredTeachersQuery, GetAdministeredTeachersQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    email
    name
    id
    role
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserNameDocument = gql`
    query GetUserName {
  getCurrentUser {
    id
    name
  }
}
    `;

/**
 * __useGetUserNameQuery__
 *
 * To run a query within a React component, call `useGetUserNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserNameQuery(baseOptions?: Apollo.QueryHookOptions<GetUserNameQuery, GetUserNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserNameQuery, GetUserNameQueryVariables>(GetUserNameDocument, options);
      }
export function useGetUserNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserNameQuery, GetUserNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserNameQuery, GetUserNameQueryVariables>(GetUserNameDocument, options);
        }
export type GetUserNameQueryHookResult = ReturnType<typeof useGetUserNameQuery>;
export type GetUserNameLazyQueryHookResult = ReturnType<typeof useGetUserNameLazyQuery>;
export type GetUserNameQueryResult = Apollo.QueryResult<GetUserNameQuery, GetUserNameQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userUpdateInput: UserUpdateInput!) {
  updateUser(userUpdateInput: $userUpdateInput) {
    email
    name
    id
    role
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userUpdateInput: // value for 'userUpdateInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
  forgotPassword(forgotPasswordInput: $forgotPasswordInput)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {
  resetPassword(resetPasswordInput: $resetPasswordInput)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      resetPasswordInput: // value for 'resetPasswordInput'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($verifyEmailInput: VerifyEmailInput!) {
  verifyEmail(verifyEmailInput: $verifyEmailInput)
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      verifyEmailInput: // value for 'verifyEmailInput'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const DeleteOwnUserDocument = gql`
    mutation DeleteOwnUser {
  deleteOwnUser {
    id
  }
}
    `;
export type DeleteOwnUserMutationFn = Apollo.MutationFunction<DeleteOwnUserMutation, DeleteOwnUserMutationVariables>;

/**
 * __useDeleteOwnUserMutation__
 *
 * To run a mutation, you first call `useDeleteOwnUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOwnUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOwnUserMutation, { data, loading, error }] = useDeleteOwnUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteOwnUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOwnUserMutation, DeleteOwnUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOwnUserMutation, DeleteOwnUserMutationVariables>(DeleteOwnUserDocument, options);
      }
export type DeleteOwnUserMutationHookResult = ReturnType<typeof useDeleteOwnUserMutation>;
export type DeleteOwnUserMutationResult = Apollo.MutationResult<DeleteOwnUserMutation>;
export type DeleteOwnUserMutationOptions = Apollo.BaseMutationOptions<DeleteOwnUserMutation, DeleteOwnUserMutationVariables>;
export const UpdateSchoolDataDocument = gql`
    mutation UpdateSchoolData($loginData: WebUntisImportInput!) {
  updateSchoolData(loginData: $loginData) {
    username
  }
}
    `;
export type UpdateSchoolDataMutationFn = Apollo.MutationFunction<UpdateSchoolDataMutation, UpdateSchoolDataMutationVariables>;

/**
 * __useUpdateSchoolDataMutation__
 *
 * To run a mutation, you first call `useUpdateSchoolDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchoolDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchoolDataMutation, { data, loading, error }] = useUpdateSchoolDataMutation({
 *   variables: {
 *      loginData: // value for 'loginData'
 *   },
 * });
 */
export function useUpdateSchoolDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSchoolDataMutation, UpdateSchoolDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSchoolDataMutation, UpdateSchoolDataMutationVariables>(UpdateSchoolDataDocument, options);
      }
export type UpdateSchoolDataMutationHookResult = ReturnType<typeof useUpdateSchoolDataMutation>;
export type UpdateSchoolDataMutationResult = Apollo.MutationResult<UpdateSchoolDataMutation>;
export type UpdateSchoolDataMutationOptions = Apollo.BaseMutationOptions<UpdateSchoolDataMutation, UpdateSchoolDataMutationVariables>;