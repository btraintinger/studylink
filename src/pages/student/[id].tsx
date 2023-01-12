import { Box, Button, TextField, Alert } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Layout from '../../components/page/layout';

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
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<StudentInput> = async (values) => {
    setError('error');
  };

  return (
    <Layout role="STUDENT">
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
    </Layout>
  );
}
