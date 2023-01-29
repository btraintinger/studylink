import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import {
  useCreateSchoolClassMutation,
  useGetSchoolClassByIdQuery,
  useUpdateSchoolClassMutation,
} from '../../../../../generated/graphql';
import Layout from '../../../../components/page/layout';
import FormWrapper from '../../../../components/utils/formWrapper';
import LoadingPage from '../../../../components/utils/loadingPage';
import {
  DEPARTMENTS_ADMIN,
  SCHOOL_CLASSES_ADMIN,
} from '../../../../constants/menu-items';

const schoolClassSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  longName: string().min(1, '* Bitte geben Sie erweiterten langen Namen an'),
});

type SchoolClassInput = TypeOf<typeof schoolClassSchema>;

export default function SchoolClass() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // get schoolClassId from url
  const { schoolClassId, departmentId } = router.query;
  let queryId: number | null = parseInt(schoolClassId as string, 10);
  if (schoolClassId === 'new') queryId = null;

  if (queryId === null && departmentId === undefined)
    router.push(DEPARTMENTS_ADMIN);

  // graphql queries and mutations
  const [createFunction] = useCreateSchoolClassMutation({
    onError: (error) => {
      if (error.message === 'CreationFailedError')
        setErrorMessage('Die Erstellung war nicht möglich');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });
  const [updateFunction] = useUpdateSchoolClassMutation({
    onError: (error) => {
      if (error.message === 'UpdateFailedError')
        setErrorMessage('Die Aktualisierung war nicht möglich');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });
  const { loading } = useGetSchoolClassByIdQuery({
    skip: queryId === null,
    variables: {
      getSchoolClassByIdId: queryId as number,
    },
    onCompleted: (data) => {
      reset(data.getSchoolClassById);
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
  } = useForm<SchoolClassInput>({
    resolver: zodResolver(schoolClassSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<SchoolClassInput> = async (values) => {
    if (queryId === null) {
      const schoolClass = await createFunction({
        variables: {
          schoolClassCreateInput: {
            name: values.name,
            longName: values.longName,
            departmentId: parseInt(departmentId as string, 10),
          },
        },
      });
      router.push(
        `${SCHOOL_CLASSES_ADMIN}/${schoolClass?.data?.createSchoolClass.id}`
      );
    } else {
      await updateFunction({
        variables: {
          schoolClassUpdateInput: {
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
