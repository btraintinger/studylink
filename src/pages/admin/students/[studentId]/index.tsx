import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import {
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useGetSchoolClassesOfSchoolQuery,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from '../../../../../generated/graphql';
import Layout from '../../../../components/page/layout';
import ControlledAutocomplete from '../../../../components/utils/controlledAutocomplete';
import FormWrapper from '../../../../components/utils/formWrapper';
import LoadingPage from '../../../../components/utils/loadingPage';
import { STUDENTS_ADMIN } from '../../../../constants/menu-items';

const studentSchema = object({
  firstName: string().min(1, '* Bitte geben Sie einen Vornamen an'),
  lastName: string().min(1, '* Bitte geben Sie einen Nachnamen an'),
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  email: string().email('* Bitte geben Sie eine gültige E-Mail-Adresse an'),
  studentClass: object({
    id: number().int('* Bitte wählen Sie eine Klasse aus'),
    name: string().min(1, '* Bitte wählen Sie eine Klasse aus'),
  }),
});

type StudentInput = TypeOf<typeof studentSchema>;

export default function Student() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // get studentId from url
  const { studentId } = router.query;
  let queryId: number | null = parseInt(studentId as string, 10);
  if (studentId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useCreateStudentMutation({
    onError: (error) => {
      if (error.message === 'CreationFailedError')
        setErrorMessage('Die Erstellung war nicht möglich');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
      if (error.message === 'AlreadyExistsError')
        setErrorMessage(
          'Es existiert bereits ein Schüler mit dieser E-Mail. Bitten Sie den Schüler sich anzumelden.'
        );
    },
    refetchQueries: ['GetAdministeredStudents'],
  });
  const [updateFunction] = useUpdateStudentMutation({
    onError: (error) => {
      if (error.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
    refetchQueries: ['GetAdministeredStudents'],
  });
  const [deleteFunction] = useDeleteStudentMutation({
    onError: (error) => {
      if (error.message === 'DeletionFailedError')
        setErrorMessage('Bei der Löschung ist ein Fehler aufgetreten');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
    refetchQueries: ['GetAdministeredStudents'],
  });

  const [defaultSchoolClass, setDefaultSchoolClass] = useState<{
    id: number;
    name: string | undefined;
  } | null>(null);

  const { data: schoolClasses } = useGetSchoolClassesOfSchoolQuery();

  const { data: studentQueryResult, loading } = useGetStudentByIdQuery({
    skip: queryId === null,
    variables: {
      getStudentByIdId: queryId as number,
    },
    onError: (error) => {
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
    onCompleted: (data) => {
      setDefaultSchoolClass({
        id: data.getStudentById.schoolClassId,
        name: schoolClasses?.getSchoolClassesOfSchool.find(
          (schoolClass) =>
            parseInt(schoolClass.id as unknown as string, 10) ===
            data.getStudentById.schoolClassId
        )?.name,
      });
      reset({
        name: data.getStudentById.user.name,
        email: data.getStudentById.user.email,
        firstName: data.getStudentById.user.firstName,
        lastName: data.getStudentById.user.lastName,
        studentClass: defaultSchoolClass || undefined,
      });
    },
  });

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    control,
  } = useForm<StudentInput>({
    resolver: zodResolver(studentSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<StudentInput> = async (values) => {
    if (queryId === null) {
      const student = await createFunction({
        variables: {
          studentInput: {
            name: values.name,
            email: values.email,
            schoolClassId: values.studentClass.id,
            firstName: values.firstName,
            lastName: values.lastName,
          },
        },
      });
      router.push(`${STUDENTS_ADMIN}/${student?.data?.createStudent.id}`);
    } else {
      await updateFunction({
        variables: {
          studentInput: {
            id: queryId,
            name: values.name,
            email: values.email,
            schoolClassId: values.studentClass.id,
            firstName: values.firstName,
            lastName: values.lastName,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  if (loading)
    return (
      <Layout role="ADMIN">
        <LoadingPage />
      </Layout>
    );

  return (
    <Layout role="ADMIN">
      <FormWrapper>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            sx={{ mb: 2 }}
            label="Vorname"
            fullWidth
            required
            type="text"
            error={!!errors['firstName']}
            helperText={errors['firstName'] ? errors['firstName'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('firstName')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Nachname"
            fullWidth
            required
            type="text"
            error={!!errors['lastName']}
            helperText={errors['lastName'] ? errors['lastName'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('lastName')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Name"
            fullWidth
            type="text"
            error={!!errors['name']}
            helperText={errors['name'] ? errors['name'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('name')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="E-Mail"
            fullWidth
            required
            type="email"
            error={!!errors['email']}
            helperText={errors['email'] ? errors['email'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('email')}
          />
          <ControlledAutocomplete
            label="Klasse"
            name="studentClass"
            options={
              schoolClasses?.getSchoolClassesOfSchool.map((schoolClass) => {
                return {
                  id: parseInt(schoolClass.id as unknown as string, 10),
                  name: schoolClass.name,
                };
              }) || []
            }
            control={control}
            defaultValue={defaultSchoolClass}
            error={!!errors['studentClass']}
            helperText={
              errors['studentClass'] ? errors['studentClass'].message : ''
            }
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 1, mb: 2 }}
          >
            Speichern
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            disabled={queryId === null}
            onClick={() => {
              if (queryId !== null) {
                deleteFunction({
                  variables: {
                    deleteStudentId: queryId,
                  },
                });
                router.push(STUDENTS_ADMIN);
              }
            }}
          >
            Löschen
          </Button>
          <Alert
            severity="error"
            sx={{
              display: errorMessage ? null : 'none',
              marginTop: '15px',
            }}
          >
            {errorMessage}
          </Alert>
        </Box>
      </FormWrapper>
    </Layout>
  );
}
