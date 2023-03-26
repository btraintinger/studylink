import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import AuthWrapper from '../../components/utils/authWrapper';
import LoadingPage from '../../components/utils/loadingPage';

const signUpSchema = object({
  email: string().email('* Email must be a valid email address'),
  password: string().min(1, '* Passwort wird benötigt'),
  passwordConfirm: string().min(1, 'Bitte Passwort bestätigen'),
  name: string().min(1, '* Name wird benötigt'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: '* Passwörter stimmen nicht überein',
});

type SignUpInput = TypeOf<typeof signUpSchema>;

export default function LoginPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [error, setError] = useState('');

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  if (status === 'loading') return <LoadingPage />;
  if (session) router.push('/');

  const onSubmitHandler: SubmitHandler<SignUpInput> = async (values) => {
    const response = await signIn('signup', {
      email: values.email,
      password: values.password,
      name: values.name,
      redirect: false,
    });
    if (response === undefined) return;
    if (response.error === 'EmailVerificationNeeded')
      router.push('/auth/signin');
    if (response.error) setError(response.error);
  };

  return (
    <AuthWrapper>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Registrieren
      </Typography>
      <Typography component="p" fontSize="0.8rem">
        Nach der Registrierung wird eine E-Mail an dich gesendet, welche 15
        Minuten lang gültig ist, um deine E-Mail Adresse zu verifizieren.
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 3 }}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Email"
          fullWidth
          required
          type="email"
          error={!!errors['email']}
          helperText={errors['email'] ? errors['email'].message : ''}
          {...register('email')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Passwort"
          fullWidth
          required
          type="password"
          error={!!errors['password']}
          helperText={errors['password'] ? errors['password'].message : ''}
          {...register('password')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Passwort bestätigen"
          fullWidth
          required
          type="password"
          error={!!errors['passwordConfirm']}
          helperText={
            errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
          }
          {...register('passwordConfirm')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Name"
          fullWidth
          required
          type="text"
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 1, mb: 2 }}
        >
          Bestätigen
        </Button>

        <Grid container>
          <Grid item>
            <MuiLink
              underline="none"
              sx={{ fontSize: '14px', fontStyle: 'bold' }}
              component={Link}
              href="/auth/signin"
              passHref
            >
              {'Hast du schon einen Account? Logge dich ein'}
            </MuiLink>
          </Grid>
        </Grid>
        <Alert
          severity="error"
          sx={{
            display: error ? null : 'none',
            marginTop: '15px',
          }}
        >
          {error}
        </Alert>
      </Box>
    </AuthWrapper>
  );
}
