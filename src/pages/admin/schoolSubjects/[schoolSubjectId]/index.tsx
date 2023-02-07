import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import {
  useCreateSchoolSubjectMutation,
  useGetSchoolSubjectByIdQuery,
  useUpdateSchoolSubjectMutation,
} from '../../../../../generated/graphql';
import Layout from '../../../../components/page/layout';
import FormWrapper from '../../../../components/utils/formWrapper';
import LoadingPage from '../../../../components/utils/loadingPage';
import { SCHOOL_SUBJECTS_ADMIN } from '../../../../constants/menu-items';

const schoolSubjectSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  longName: string().min(1, '* Bitte geben Sie erweiterten langen Namen an'),
});

type SchoolSubjectInput = TypeOf<typeof schoolSubjectSchema>;

export default function SchoolSubject() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // get schoolSubjectId from url
  const { schoolSubjectId } = router.query;
  let queryId: number | null = parseInt(schoolSubjectId as string, 10);
  if (schoolSubjectId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useCreateSchoolSubjectMutation({
    onError: (error) => {
      if (error.message === 'CreationFailedError')
        setErrorMessage('Die Erstellung war nicht möglich');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
      if (error.message === 'NoSchoolError') router.push('/admin/school');
    },
  });
  const [updateFunction] = useUpdateSchoolSubjectMutation({
    onError: (error) => {
      if (error.message === 'UpdateFailedError')
        setErrorMessage('Die Aktualisierung war nicht möglich');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });
  const { loading } = useGetSchoolSubjectByIdQuery({
    skip: queryId === null,
    variables: {
      getSchoolSubjectByIdId: queryId as number,
    },
    onCompleted: (data) => {
      reset(data.getSchoolSubjectById);
    },
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
    },
  });

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SchoolSubjectInput>({
    resolver: zodResolver(schoolSubjectSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<SchoolSubjectInput> = async (values) => {
    if (queryId === null) {
      const schoolSubject = await createFunction({
        variables: {
          schoolSubjectCreationInput: {
            name: values.name,
            longName: values.longName,
          },
        },
      });
      router.push(
        `${SCHOOL_SUBJECTS_ADMIN}/${schoolSubject?.data?.createSchoolSubject.id}`
      );
    } else {
      await updateFunction({
        variables: {
          schoolSubjectUpdateInput: {
            id: queryId,
            name: values.name,
            longName: values.longName,
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
            label="Erweiterter Name"
            fullWidth
            required
            type="text"
            error={!!errors['longName']}
            helperText={errors['longName'] ? errors['longName'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('longName')}
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
