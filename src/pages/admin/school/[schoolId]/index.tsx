import { gql, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import Layout from '../../../../components/page/layout';
import FormWrapper from '../../../../components/utils/formWrapper';
import LoadingPage from '../../../../components/utils/loadingPage';
import {
  useGetSchoolByIdQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
} from '../../../../../generated/graphql';

const schoolSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
});

type SchoolInput = TypeOf<typeof schoolSchema>;

export default function School() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // get schoolId from url
  const { schoolId } = router.query;
  let queryId: number | null = parseInt(schoolId as string, 10);
  if (schoolId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useCreateSchoolMutation({
    onError: (error) => {
      if (error.message === 'CreationFailedError')
        setErrorMessage('Die Erstellung war nicht möglich');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });
  const [updateFunction] = useUpdateSchoolMutation({
    onError: (error) => {
      if (error.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });
  const { data, loading, error, refetch } = useGetSchoolByIdQuery({
    variables: {
      getSchoolByIdId: queryId as number,
    },
    onError: (error) => {
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
    onCompleted: (data) => {
      if (data) reset(data.getSchoolById);
    },
  });

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SchoolInput>({
    resolver: zodResolver(schoolSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<SchoolInput> = async (values) => {
    if (queryId === null) {
      const school = await createFunction({
        variables: {
          schoolCreationInput: {
            name: values.name,
          },
        },
      });
      router.push(`/admin/school/${school?.data?.createSchool.id}`);
    } else {
      await updateFunction({
        variables: {
          schoolUpdateInput: {
            id: queryId,
            name: values.name,
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
    <Layout role="ADMIN">
      <LoadingPage></LoadingPage>
    </Layout>;

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
            sx={{ mt: 1, mb: 2, display: queryId === null ? 'none' : null }}
            onClick={() => router.push(`/admin/school/${schoolId}/new`)}
          >
            Neue Abteilung hinzufügen
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
