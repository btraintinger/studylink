import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
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

const loginSchema = object({
  email: string().email('* Email must be a valid email address'),
  password: string(),
});

type LoginInput = TypeOf<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [error, setError] = useState('');

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  if (status === 'loading') return <LoadingPage />;
  if (session) router.push('/');

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    const response = await signIn('signin', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (response === undefined) return;
    if (response.ok) {
      router.push('/');
      return;
    }
    if (response.error) setError(response.error);
  };

  return (
    <AuthWrapper>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Anmelden
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
          label="Password"
          fullWidth
          required
          type="password"
          error={!!errors['password']}
          helperText={errors['password'] ? errors['password'].message : ''}
          {...register('password')}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 1, mb: 2 }}
        >
          Bestätigen
        </Button>

        <Grid container justifyContent="space-between">
          <Grid item>
            <MuiLink
              sx={{ fontSize: '14px', fontStyle: 'bold' }}
              underline="none"
              component={Link}
              href="/auth/resetPassword"
              passHref
            >
              {'Passwort vergessen?'}
            </MuiLink>
          </Grid>
          <Grid item>
            <MuiLink
              component={Link}
              href="/info"
              passHref
              underline="none"
              sx={{ fontSize: '14px', fontStyle: 'bold' }}
              fontSize={'1rem'}
            >
              {'Noch kein Account bereitgestellt?'}
            </MuiLink>
          </Grid>
        </Grid>
        <MuiLink
          component={Link}
          href="/auth/resetPassword"
          passHref
          underline="none"
          sx={{ fontSize: '14px', fontStyle: 'bold' }}
          fontSize={'1rem'}
        >
          {'Erstanmeldung? Passwort anfordern'}
        </MuiLink>

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
