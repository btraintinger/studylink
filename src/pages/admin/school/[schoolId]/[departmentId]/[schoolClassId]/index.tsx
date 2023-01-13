import { gql, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import Layout from '../../../../../../components/page/layout';
import FormWrapper from '../../../../../../components/utils/formWrapper';
import LoadingPage from '../../../../../../components/utils/loadingPage';

const SCHOOL_CLASS_QUERY = gql`
  query Query($getSchoolClassByIdId: Float!) {
    getSchoolClassById(id: $getSchoolClassByIdId) {
      grade
      name
    }
  }
`;

const CREATE_SCHOOL_CLASS_MUTATION = gql`
  mutation CreateSchoolClass(
    $schoolClassCreateInput: SchoolClassCreationInput!
  ) {
    createSchoolClass(schoolClassCreateInput: $schoolClassCreateInput) {
      id
    }
  }
`;

const UPDATE_SCHOOL_CLASS_MUTATION = gql`
  mutation UpdateSchoolClass($schoolClassUpdateInput: SchoolClassUpdateInput!) {
    updateSchoolClass(schoolClassUpdateInput: $schoolClassUpdateInput) {
      id
    }
  }
`;

const schoolClassSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  grade: number().min(1, '* Bitte geben Sie eine Schulstufe an'),
});

type SchoolClassInput = TypeOf<typeof schoolClassSchema>;

export default function SchoolClass() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // get schoolClassId from url
  const { schoolClassId, schoolId, departmentId } = router.query;
  let queryId: number | null = parseInt(schoolClassId as string, 10);
  if (schoolClassId === 'new') queryId = null;
  if (!schoolId) return router.push('/404');
  if (!departmentId) return router.push('/404');

  // graphql queries and mutations
  const [createFunction] = useMutation(CREATE_SCHOOL_CLASS_MUTATION);
  const [updateFunction] = useMutation(UPDATE_SCHOOL_CLASS_MUTATION);
  const { data, loading, error, refetch } = useQuery(SCHOOL_CLASS_QUERY, {
    variables: {
      getSchoolClassByIdId: queryId,
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

  useEffect(() => {
    if (data) {
      reset(data.getSchoolClassById);
    }
  }, [data]);

  useEffect(() => {
    if (error?.message === 'DoesNotExistError') router.push('/404');
    if (error?.message === 'NotAuthorizedError') router.push('/401');
    if (error?.message === 'CreationFailedError')
      setErrorMessage('Die Erstellung war nicht möglich');
    if (error?.message === 'UpdateFailedError')
      setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
  }, [error]);

  const onSubmitHandler: SubmitHandler<SchoolClassInput> = async (values) => {
    if (queryId === null) {
      const schoolClass = await createFunction({
        variables: {
          schoolClassInput: {
            name: values.name,
            departmentId: parseInt(departmentId as string, 10),
            grade: values.grade,
          },
        },
      });
      router.push(
        `/admin/schoolClass/${schoolClass.data.createSchoolClass.id}`
      );
    } else {
      await updateFunction({
        variables: {
          schoolClassInput: {
            id: queryId,
            name: values.name,
            grade: values.grade,
          },
        },
      });
      refetch();
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
            label="Schulstufe"
            fullWidth
            required
            type="number"
            error={!!errors['grade']}
            helperText={errors['grade'] ? errors['grade'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('grade')}
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
