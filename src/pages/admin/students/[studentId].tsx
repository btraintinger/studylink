import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';
import { Moment } from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import {
  useCreateStudentMutation,
  useGetSchoolClassesOfSchoolQuery,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import FormWrapper from '../../../components/utils/formWrapper';
import LoadingPage from '../../../components/utils/loadingPage';
import { STUDENTS_ADMIN } from '../../../constants/menu-items';

const studentSchema = object({
  firstName: string().min(1, '* Bitte geben Sie einen Vornamen an'),
  lastName: string().min(1, '* Bitte geben Sie einen Nachnamen an'),
  birthday: string().min(1, '* Bitte geben Sie ein Geburtsdatum an'),
  name: string(),
  email: string().email('* Bitte geben Sie eine gültige E-Mail-Adresse an'),
  studentClass: object({
    id: number().int().nonnegative('* Bitte wählen Sie eine Klasse aus'),
  }),
});

type StudentInput = TypeOf<typeof studentSchema>;

export default function Student() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [birthday, setBirthday] = useState<Moment | null>(null);

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
    },
  });
  const [updateFunction] = useUpdateStudentMutation({
    onError: (error) => {
      if (error.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });
  const { loading } = useGetStudentByIdQuery({
    skip: queryId === null,
    variables: {
      getStudentByIdId: queryId as number,
    },
    onError: (error) => {
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
    onCompleted: (data) => {
      if (data)
        reset({
          name: data.getStudentById.user.name,
          email: data.getStudentById.user.email,
          studentClass: { id: data.getStudentById.schoolClass.id },
        });
    },
  });

  const { data: schoolClasses } = useGetSchoolClassesOfSchoolQuery();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
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
            birthday: values.birthday,
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
            birthday: values.birthday,
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

  if (loading) <LoadingPage></LoadingPage>;

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

          <Autocomplete
            sx={{ mb: 2 }}
            disablePortal
            options={schoolClasses?.getSchoolClassesOfSchool || []}
            getOptionLabel={(option: { id: number; name: string }) =>
              option.name
            }
            fullWidth
            renderInput={(params) => <TextField {...params} label="Klasse" />}
            {...register('studentClass')}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 1, mb: 2 }}
          >
            Speichern
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
