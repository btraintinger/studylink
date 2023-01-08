import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link as MuiLink,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const signUpSchema = object({
  email: string().email('* Email must be a valid email address'),
  password: string().min(1, '* Passwort wird benötigt'),
  passwordConfirm: string().min(1, 'Bitte Passwort bestätigen'),
  name: string().min(1, '* Name wird benötigt'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: '* Passwords do not match',
});

type SignUpInput = TypeOf<typeof signUpSchema>;

export default function LoginPage() {
  const router = useRouter();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<SignUpInput> = async (values) => {
    const response = await signIn('signup', {
      email: values.email,
      password: values.password,
      name: values.name,
      redirect: false,
    });
    if (response === undefined) return;
    if (response.ok)
      return router.push({
        pathname: '/',
      });
    if (response.error) setError(response.error);
  };

  return (
    <Container maxWidth="xs">
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
          Registrieren
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
              <Link href="/auth/signin" legacyBehavior>
                <MuiLink component={Link} href="/auth/signup" passHref>
                  {'Hast du schon einen Account? Logge dich ein'}
                </MuiLink>
              </Link>
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
      </Box>
    </Container>
  );
}
