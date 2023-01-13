import { gql, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import Layout from '../../components/page/layout';
import FormWrapper from '../../components/utils/formWrapper';
import LoadingPage from '../../components/utils/loadingPage';

const USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      email
      name
      id
      role
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userUpdateInput: UserUpdateInput!) {
    updateUser(userUpdateInput: $userUpdateInput) {
      id
    }
  }
`;

const userSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  email: string().email('* Bitte geben Sie eine gültige E-Mail-Adresse an'),
  role: string(),
});

type UserInput = TypeOf<typeof userSchema>;

export default function User() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // graphql queries and mutations
  const [updateFunction] = useMutation(UPDATE_USER_MUTATION);
  const { data, loading, error, refetch } = useQuery(USER_QUERY);

  const { data: session, status } = useSession();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (data) {
      reset(data.getCurrentUser);
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

  const onSubmitHandler: SubmitHandler<UserInput> = async (values) => {
    await updateFunction({
      variables: {
        userUpdateInput: {
          name: values.name,
          email: values.email,
        },
      },
    });
    refetch();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  if (loading) <LoadingPage></LoadingPage>;

  if (session?.user.role === 'ADMIN')
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
              defaultValue=" " // formatting
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
              defaultValue="a@b.com" // formatting
              {...register('email')}
            />
            <TextField
              sx={{ mb: 2 }}
              variant="standard"
              label="Rolle"
              fullWidth
              required
              type="text"
              disabled
              defaultValue=" "
              {...register('role')}
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
  else
    return (
      <Layout role="STUDENT">
        <FormWrapper>
          <Box component="form">
            <TextField
              sx={{ mb: 2 }}
              variant="standard"
              label="Name"
              fullWidth
              required
              disabled
              type="text"
              error={!!errors['name']}
              helperText={errors['name'] ? errors['name'].message : ''}
              defaultValue=" " // formatting
              {...register('name')}
            />
            <TextField
              sx={{ mb: 2 }}
              variant="standard"
              label="E-Mail"
              fullWidth
              required
              disabled
              type="email"
              error={!!errors['email']}
              helperText={errors['email'] ? errors['email'].message : ''}
              defaultValue="a@b.com" // formatting
              {...register('email')}
            />
            <TextField
              sx={{ mb: 2 }}
              variant="standard"
              label="Rolle"
              fullWidth
              required
              type="text"
              disabled
              defaultValue=" "
              {...register('role')}
            />
          </Box>
        </FormWrapper>
      </Layout>
    );
}
