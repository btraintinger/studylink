import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import Layout from '../../../components/page/layout';
import FormWrapper from '../../../components/utils/formWrapper';
import LoadingPage from '../../../components/utils/loadingPage';
import {
  useGetStudentByIdQuery,
  useGetSchoolClassesOfSchoolQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from '../../../../generated/graphql';

const studentSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  email: string().email('* Bitte geben Sie eine gültige E-Mail-Adresse an'),
  studentClass: object({
    id: number().int().nonnegative('* Bitte wählen Sie eine Klasse aus'),
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
          },
        },
      });
      router.push(`/admin/student/${student?.data?.createStudent.id}`);
    } else {
      await updateFunction({
        variables: {
          studentInput: {
            id: queryId,
            name: values.name,
            email: values.email,
            schoolClassId: values.studentClass.id,
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
            variant="standard"
            label="Name"
            fullWidth
            required
            type="text"
            error={!!errors['name']}
            helperText={errors['name'] ? errors['name'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('name')}
          />
          <TextField
            sx={{ mb: 2 }}
            variant="standard"
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
