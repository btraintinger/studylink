import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
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
import LoadingPage from '../../components/utils/loadingPage';

const resetSchema = object({
  email: string().email('* Email must be a valid email address'),
});

type ResetInput = TypeOf<typeof resetSchema>;

export default function ResetPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [error, setError] = useState('');

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  if (status === 'loading') return <LoadingPage />;
  if (session) router.push('/');

  const onSubmitHandler: SubmitHandler<ResetInput> = async (values) => {
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
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '40px',

          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
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

          <MuiLink
            sx={{ fontSize: '14px', fontStyle: 'bold' }}
            underline="none"
            component={Link}
            href="#"
            passHref
          >
            {'Passwort vergessen?'}
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
      </Box>
    </Container>
  );
}
