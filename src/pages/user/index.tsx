import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import {
  useDeleteOwnUserMutation,
  useForgotPasswordMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from '../../../generated/graphql';
import Layout from '../../components/page/layout';
import FormWrapper from '../../components/utils/formWrapper';
import LoadingPage from '../../components/utils/loadingPage';

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
  const [updateFunction] = useUpdateUserMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
    },
  });

  const { loading } = useGetCurrentUserQuery({
    onCompleted: (data) => {
      if (data) reset(data.getCurrentUser);
    },
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
    },
  });

  const [resetPasswordFunction] = useForgotPasswordMutation();

  const [deleteUserFunction] = useDeleteOwnUserMutation({
    refetchQueries: ['GetAdministeredSchool'],
  });

  const { data: session } = useSession();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<UserInput> = async (values) => {
    await updateFunction({
      variables: {
        userUpdateInput: {
          name: values.name,
          email: values.email,
        },
      },
    });
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
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                if (!session.user.email) return;
                resetPasswordFunction({
                  variables: {
                    forgotPasswordInput: {
                      email: session.user.email,
                    },
                  },
                });
              }}
              sx={{ mt: 1, mb: 2 }}
            >
              Passwort per E-Mail zurücksetzen
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                deleteUserFunction();
                signOut({ redirect: false });
                router.push('/');
              }}
              sx={{ mt: 1, mb: 2 }}
            >
              Account löschen
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
          <Box>
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
