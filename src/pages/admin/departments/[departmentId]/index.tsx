import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import {
  useCreateDepartmentMutation,
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
} from '../../../../../generated/graphql';
import Layout from '../../../../components/page/layout';
import FormWrapper from '../../../../components/utils/formWrapper';
import LoadingPage from '../../../../components/utils/loadingPage';
import {
  DEPARTMENTS_ADMIN,
  SCHOOL_ADMIN,
  SCHOOL_CLASSES_ADMIN,
} from '../../../../constants/menu-items';

const departmentSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  longName: string().min(1, '* Bitte geben Sie erweiterten langen Namen an'),
});

type DepartmentInput = TypeOf<typeof departmentSchema>;

export default function Department() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // get departmentId from url
  const { departmentId, schoolId } = router.query;
  let queryId: number | null = parseInt(departmentId as string, 10);
  if (departmentId === 'new') queryId = null;

  if (queryId === null && schoolId === undefined) router.push(SCHOOL_ADMIN);

  // graphql queries and mutations
  const [createFunction] = useCreateDepartmentMutation({
    onError: (error) => {
      if (error.message === 'CreationFailedError')
        setErrorMessage('Die Erstellung war nicht möglich');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });
  const [updateFunction] = useUpdateDepartmentMutation({
    onError: (error) => {
      if (error.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });
  const { loading } = useGetDepartmentByIdQuery({
    skip: queryId === null,
    variables: {
      getDepartmentByIdId: queryId as number,
    },
    onCompleted: (data) => {
      if (data) reset(data.getDepartmentById);
    },
    onError: (error) => {
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<DepartmentInput> = async (values) => {
    if (queryId === null) {
      const department = await createFunction({
        variables: {
          departmentInput: {
            name: values.name,
            schoolId: parseInt(schoolId as string, 10),
            longName: values.longName,
          },
        },
      });
      router.push({
        pathname: `${DEPARTMENTS_ADMIN}/${department.data?.createDepartment.id}`,
      });
    } else {
      await updateFunction({
        variables: {
          departmentInput: {
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
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1, mb: 2 }}
            onClick={() =>
              router.push({
                pathname: `${SCHOOL_CLASSES_ADMIN}/new`,
                query: { departmentId: queryId },
              })
            }
            disabled={queryId === null}
          >
            Neue Schulklasse hinzufügen
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
