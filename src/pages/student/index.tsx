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
import { number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

// TODO get school from backend over user email

const studentSchema = object({
  schoolClassId: number().int().min(1),
});

type StudentInput = TypeOf<typeof studentSchema>;

export default function Student() {
  const [error, setError] = useState('');

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<StudentInput>({
    resolver: zodResolver(studentSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<StudentInput> = async (values) => {
    setError('error');
  };

  return (
    <Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 3 }}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Schulklasse"
          fullWidth
          required
          type="number"
          error={!!errors['schoolClassId']}
          helperText={
            errors['schoolClassId'] ? errors['schoolClassId'].message : ''
          }
          {...register('schoolClassId')}
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
            display: error ? null : 'none',
            marginTop: '15px',
          }}
        >
          {error}
        </Alert>
      </Box>
    </Box>
  );
}
