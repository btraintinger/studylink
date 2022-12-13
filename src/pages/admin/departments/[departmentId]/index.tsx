import { gql, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';

const DEPARTMENT_QUERY = gql`
  query GetDepartmentById($getDepartmentByIdId: Float!) {
    getDepartmentById(id: $getDepartmentByIdId) {
      id
      name
      schoolId
    }
  }
`;

const CREATE_DEPARTMENT_MUTATION = gql`
  mutation CreateDepartment(
    $departmentCreationInput: DepartmentCreationInput!
  ) {
    createDepartment(departmentCreationInput: $departmentCreationInput) {
      id
    }
  }
`;

const UPDATE_DEPARTMENT_MUTATION = gql`
  mutation UpdateDepartment($departmentUpdateInput: DepartmentUpdateInput!) {
    updateDepartment(departmentUpdateInput: $departmentUpdateInput) {
      id
    }
  }
`;

const departmentSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  handle: string().min(1, '* Bitte geben Sie einen Handle an'),
  domain: string().min(1, '* Bitte geben Sie eine Domain an'),
});

type DepartmentInput = TypeOf<typeof departmentSchema>;

export default function Department() {
  const router = useRouter();

  // get departmentId from url
  const { departmentId } = router.query;
  let queryId: number | null = parseInt(departmentId as string);
  if (departmentId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useMutation(CREATE_DEPARTMENT_MUTATION);
  const [updateFunction] = useMutation(UPDATE_DEPARTMENT_MUTATION);
  const { data, loading, error } = useQuery(DEPARTMENT_QUERY, {
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

  const onSubmitHandler: SubmitHandler<DepartmentInput> = async (values) => {
    if (queryId === null) {
      await createFunction({
        variables: { departmentCreationInput: { ...values } },
      });
    } else {
      await updateFunction({
        variables: { departmentUpdateInput: { id: queryId, ...values } },
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
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
        label="Handle"
        fullWidth
        required
        type="text"
        error={!!errors['handle']}
        helperText={errors['handle'] ? errors['handle'].message : ''}
        defaultValue={queryId === null ? '' : ' '} // formatting
        disabled={queryId !== null}
        {...register('handle')}
      />
      <TextField
        sx={{ mb: 2 }}
        label="Domain"
        fullWidth
        required
        type="text"
        error={!!errors['domain']}
        helperText={errors['domain'] ? errors['domain'].message : ''}
        defaultValue={queryId === null ? '' : ' '} // formatting
        {...register('domain')}
      />
      <Button
        sx={{
          display: queryId ? 'inherit' : 'none',
        }}
        component={Link}
        href="/admin/departments/new"
        variant="contained"
        passHref
      >
        neue Abteilung hinzufügen
      </Button>
      <Button variant="contained" fullWidth type="submit" sx={{ mt: 1, mb: 2 }}>
        Speichern
      </Button>
    </Box>
  );
}
