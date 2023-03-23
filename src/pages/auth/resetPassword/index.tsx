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
import { useForgotPasswordMutation } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';

const forgotPasswordSchema = object({
  email: string().email('* Email must be a valid email address'),
});

type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [error, setError] = useState('');

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const [forgotPasswordFunction, { loading }] = useForgotPasswordMutation({
    onError: (error) => {
      if (error.message === 'DoesNotExistError')
        setError(
          'Es konnte kein Benutzer mit dieser E-Mail-Adresse gefunden werden'
        );
    },
    onCompleted: () => {
      router.push('/auth/signin');
    },
  });

  if (loading) return <LoadingPage />;

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = async (
    values
  ) => {
    forgotPasswordFunction({
      variables: {
        forgotPasswordInput: {
          email: values.email,
        },
      },
    });
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
          Passwort Zurücksetzen
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Du erhältst eine E-Mail mit einem Link zum Zurücksetzen deines
          Passworts, welcher für 15 Minuten gültig ist.
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
