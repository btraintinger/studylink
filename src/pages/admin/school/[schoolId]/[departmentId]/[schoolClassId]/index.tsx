import { gql, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import Layout from '../../../../../../components/page/layout';
import FormWrapper from '../../../../../../components/utils/formWrapper';
import LoadingPage from '../../../../../../components/utils/loadingPage';

const DEPARTMENT_QUERY = gql`
  query GetDepartmentById($getDepartmentByIdId: Float!) {
    getDepartmentById(id: $getDepartmentByIdId) {
      id
      name
      schoolId
      schoolClasses {
        grade
        id
        name
      }
    }
  }
`;

const CREATE_DEPARTMENT_MUTATION = gql`
  mutation CreateDepartment($departmentInput: DepartmentCreateInput!) {
    createDepartment(departmentInput: $departmentInput) {
      id
    }
  }
`;

const UPDATE_DEPARTMENT_MUTATION = gql`
  mutation Mutation($departmentInput: DepartmentUpdateInput!) {
    updateDepartment(departmentInput: $departmentInput) {
      id
    }
  }
`;

const departmentSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
});

type DepartmentInput = TypeOf<typeof departmentSchema>;

export default function Department() {
  const router = useRouter();

  // get departmentId from url
  const { schoolId, departmentId } = router.query;
  const schoolQueryId: number | null = parseInt(schoolId as string);
  let queryId: number | null = parseInt(departmentId as string);
  if (departmentId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useMutation(CREATE_DEPARTMENT_MUTATION);
  const [updateFunction] = useMutation(UPDATE_DEPARTMENT_MUTATION);
  const { data, loading, error, refetch } = useQuery(DEPARTMENT_QUERY, {
    variables: {
      getDepartmentByIdId: queryId,
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

  useEffect(() => {
    if (data) {
      reset(data.getDepartmentById);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) router.push('/401');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onSubmitHandler: SubmitHandler<DepartmentInput> = async (values) => {
    if (queryId === null) {
      const department = await createFunction({
        variables: {
          departmentInput: {
            name: values.name,
            schoolId: schoolQueryId,
          },
        },
      });
      router.push(
        `/admin/school/${schoolId}/${department.data.createDepartment.id}`
      );
    } else {
      await updateFunction({
        variables: {
          departmentInput: {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  if (loading) return <LoadingPage></LoadingPage>;

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
            sx={{
              display: queryId ? 'inherit' : 'none',
            }}
            variant="contained"
            onClick={() =>
              router.push(`/admin/department/${schoolId}/${departmentId}/new`)
            }
          >
            neue Klasse hinzufügen
          </Button>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 1, mb: 2 }}
          >
            Speichern
          </Button>
        </Box>
      </FormWrapper>
    </Layout>
  );
}
