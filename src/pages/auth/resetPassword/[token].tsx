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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { useResetPasswordMutation } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';

const resetSchema = object({
  password: string().min(
    8,
    '* Passwort wird mit mindestens 8 Stellen benötigt'
  ),
  passwordConfirm: string().min(8, 'Bitte Passwort bestätigen'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: '* Passwörter stimmen nicht überein',
});

type ResetInput = TypeOf<typeof resetSchema>;

export default function PasswordReset() {
  const router = useRouter();
  const { token } = router.query;

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

  const [resetFunction, { loading }] = useResetPasswordMutation({
    onCompleted: () => {
      router.push('/auth/signin');
    },
    onError: (error) => {
      if (error.message === 'InvalidTokenError') {
        setError('Der Link ist nicht mehr gültig');
      }
    },
  });

  const onSubmitHandler: SubmitHandler<ResetInput> = async (values) => {
    resetFunction({
      variables: {
        resetPasswordInput: {
          token: token as string,
          password: values.password,
        },
      },
    });
  };

  if (loading) return <LoadingPage />;

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
          Passwort zurücksetzen
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ mt: 3 }}
        >
          <Typography component="h1" variant="h5"></Typography>
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
            href="/"
            passHref
          >
            {'Zurück auf die Startseite'}
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
