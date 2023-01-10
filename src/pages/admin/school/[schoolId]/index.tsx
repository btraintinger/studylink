import { gql, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import Layout from '../../../../components/page/layout';
import FormWrapper from '../../../../components/utils/formWrapper';

const SCHOOL_QUERY = gql`
  query GetSchoolById($getSchoolByIdId: Float!) {
    getSchoolById(id: $getSchoolByIdId) {
      admins {
        id
        user {
          email
          name
          id
        }
      }
      departments {
        id
        name
      }
      domain
      handle
      id
      name
    }
  }
`;

const CREATE_SCHOOL_MUTATION = gql`
  mutation CreateSchool($schoolCreationInput: SchoolCreationInput!) {
    createSchool(schoolCreationInput: $schoolCreationInput) {
      id
    }
  }
`;

const UPDATE_SCHOOL_MUTATION = gql`
  mutation UpdateSchool($schoolUpdateInput: SchoolUpdateInput!) {
    updateSchool(schoolUpdateInput: $schoolUpdateInput) {
      id
    }
  }
`;

const schoolSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  handle: string().min(1, '* Bitte geben Sie einen Handle an'),
  domain: string().min(1, '* Bitte geben Sie eine Domain an'),
});

type SchoolInput = TypeOf<typeof schoolSchema>;

export default function School() {
  const router = useRouter();

  // get schoolId from url
  const { schoolId } = router.query;
  let queryId: number | null = parseInt(schoolId as string);
  if (schoolId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useMutation(CREATE_SCHOOL_MUTATION);
  const [updateFunction] = useMutation(UPDATE_SCHOOL_MUTATION);
  const { data, loading, error } = useQuery(SCHOOL_QUERY, {
    variables: {
      getSchoolByIdId: queryId,
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

  useEffect(() => {
    if (data) {
      reset(data.getSchoolById);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) router.push('/401');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onSubmitHandler: SubmitHandler<SchoolInput> = async (values) => {
    if (queryId === null) {
      const school = await createFunction({
        variables: { schoolCreationInput: { ...values } },
      });
      router.push(`/admin/school/${school.data.createSchool.id}`);
    } else {
      await updateFunction({
        variables: {
          schoolUpdateInput: {
            id: queryId,
            name: values.name,
            domain: values.domain,
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
            variant="contained"
            onClick={() => router.push(`/admin/school/${schoolId}//new`)}
            fullWidth
          >
            neue Abteilung hinzufügen
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
