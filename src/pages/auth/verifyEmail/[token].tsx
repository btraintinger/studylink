import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useVerifyEmailMutation } from '../../../../generated/graphql';
import AuthWrapper from '../../../components/utils/authWrapper';
import LoadingPage from '../../../components/utils/loadingPage';

export default function PasswordReset() {
  const router = useRouter();
  const { token } = router.query;

  const [error, setError] = useState('');

  const [verifyFunction, { loading }] = useVerifyEmailMutation({
    onCompleted: () => {
      router.push('/auth/signin');
    },
    onError: (error) => {
      if (error.message === 'InvalidTokenError')
        setError(
          'Der Link ist ungültig fordere einen neuen an indem du dich versuchst anzumelden'
        );
      if (error.message === 'EmailAlreadyVerifiedError')
        setError('Der Benutzer ist bereits verifiziert melde dich an');
    },
  });

  if (loading) return <LoadingPage />;

  return (
    <AuthWrapper>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Email Verifizierung
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            verifyFunction({
              variables: {
                verifyEmailInput: {
                  token: token as string,
                },
              },
            });
          }}
        >
          Verifizieren
        </Button>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          component={Link}
          href="/auth/signin"
          passHref
        >
          Zurück zum Login
        </Button>

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
