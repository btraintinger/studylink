import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { useUpdateSchoolDataMutation } from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import FormWrapper from '../../../components/utils/formWrapper';
import LoadingPage from '../../../components/utils/loadingPage';

const webUntisSchema = object({
  username: string().min(1, '* Bitte geben Sie ihren WebUntis Benutzer an'),
  school: string().min(1, '* Bitte geben Sie ihren WebUntis Schule an'),
  server: string()
    .min(
      1,
      '* Bitte geben Sie ihren WebUntis Server an (die Subdomain wenn Sie sich auf WebUntis anmelden)'
    )
    .regex(/[A-Za-z]/, ' * Bitte geben Sie einen gültigen WebUntis Server an'),
  secret: string().min(
    1,
    '* Bitte geben Sie ihren WebUntis Schlüssel an (zu unter "Profil" -> "Freigaben" -> "Anzeigen")'
  ),
});

type WebUntisInput = TypeOf<typeof webUntisSchema>;

export default function WebUntis() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const [updateFunction, { loading }] = useUpdateSchoolDataMutation({
    onError: (error) => {
      if (error.message === 'WebUntisNotAuthenticatedError')
        setErrorMessage(
          'Die Angegebenen WebUntis Anmeldedaten sind nicht korrekt'
        );
      if (error.message === 'NoSchoolFoundError') router.push('/admin/school');
    },
    onCompleted: () => {
      router.push('/admin/school');
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<WebUntisInput>({
    resolver: zodResolver(webUntisSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<WebUntisInput> = async (values) => {
    setErrorMessage('');
    updateFunction({
      variables: {
        loginData: {
          ...values,
        },
      },
    });
  };

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
            label="WebUntis Benutzername"
            fullWidth
            required
            type="text"
            error={!!errors['username']}
            helperText={errors['username'] ? errors['username'].message : ''}
            {...register('username')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="WebUntis Schulname"
            fullWidth
            required
            type="text"
            error={!!errors['school']}
            helperText={errors['school'] ? errors['school'].message : ''}
            {...register('school')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="WebUntis Server"
            fullWidth
            required
            type="text"
            defaultValue={'borys'}
            error={!!errors['server']}
            helperText={errors['server'] ? errors['server'].message : ''}
            {...register('server')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="WebUntis Secret"
            fullWidth
            required
            type="password"
            error={!!errors['secret']}
            helperText={errors['secret'] ? errors['secret'].message : ''}
            {...register('secret')}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 1, mb: 2 }}
          >
            Bestätigen
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
