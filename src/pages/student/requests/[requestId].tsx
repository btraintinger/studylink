import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import {
  useCreateTutorRequestMutation,
  useGetSubjectsOfStudentQuery,
  useGetTutorRequestByIdQuery,
  useUpdateTutorRequestMutation,
} from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import FormWrapper from '../../../components/utils/formWrapper';
import LoadingPage from '../../../components/utils/loadingPage';

const tutorRequestSchema = object({
  description: string()
    .min(1, '* Bitte gib eine Beschreibung von bis zu 1000 Zeichen an')
    .max(1000, '* Bitte gib eine Beschreibung von bis zu 1000 Zeichen an'),
  teacher: string().min(1, '* Bitte gib einen Lehrer an'),
  grade: number()
    .min(1, '* Bitte gib eine Schulstufe an')
    .max(13, '* Bitte gib eine Schulstufe an'),
  schoolSubject: object({
    id: number().int().nonnegative('* Bitte wähle ein Fach aus'),
  }),
});

type TutorRequestInput = TypeOf<typeof tutorRequestSchema>;

export default function Offer() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // get tutorRequestId from url
  const { tutorRequestId } = router.query;
  let queryId: number | null = parseInt(tutorRequestId as string, 10);
  if (tutorRequestId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useCreateTutorRequestMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'CreationFailedError')
        setErrorMessage('Die Erstellung war nicht möglich');
    },
  });
  const [updateFunction] = useUpdateTutorRequestMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
    },
  });
  const { loading } = useGetTutorRequestByIdQuery({
    skip: queryId === null,
    variables: {
      getTutorRequestByIdId: queryId as number,
    },
    onCompleted: (data) => {
      if (data) {
        reset(data.getTutorRequestById);
      }
    },
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'CreationFailedError')
        setErrorMessage('Die Erstellung war nicht möglich');
      if (error?.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
    },
  });

  const { data } = useGetSubjectsOfStudentQuery();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<TutorRequestInput>({
    resolver: zodResolver(tutorRequestSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<TutorRequestInput> = async (values) => {
    if (queryId === null) {
      const tutorRequest = await createFunction({
        variables: {
          tutorRequestCreationInput: {
            description: values.description,
            teacher: values.teacher,
            grade: values.grade,
            schoolSubjectId: values.schoolSubject.id,
          },
        },
      });
      router.push(
        `/admin/tutorRequest/${tutorRequest?.data?.createTutorRequest.id}`
      );
    } else {
      await updateFunction({
        variables: {
          tutorRequestUpdateInput: {
            id: queryId,
            description: values.description,
            teacher: values.teacher,
            grade: values.grade,
            schoolSubjectId: values.schoolSubject.id,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  if (loading) <LoadingPage></LoadingPage>;

  return (
    <Layout role="STUDENT">
      <FormWrapper>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Autocomplete
            sx={{ mb: 2 }}
            disablePortal
            options={data?.getSubjectsOfStudent || []}
            getOptionLabel={(option: {
              id: number;
              name: string;
              extendedName: string;
            }) => `${option.name} (${option.extendedName})`}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Schulfach" />
            )}
            {...register('schoolSubject')}
          />
          <TextField
            sx={{ mb: 2 }}
            variant="standard"
            label="Beschreibung"
            fullWidth
            required
            type="text"
            multiline
            error={!!errors['description']}
            helperText={
              errors['description'] ? errors['description'].message : ''
            }
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('description')}
          />
          <TextField
            sx={{ mb: 2 }}
            variant="standard"
            label="Lehrer"
            fullWidth
            required
            type="text"
            error={!!errors['teacher']}
            helperText={errors['teacher'] ? errors['teacher'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('teacher')}
          />
          <TextField
            sx={{ mb: 2 }}
            variant="standard"
            label="Schulstufe"
            fullWidth
            required
            type="number"
            error={!!errors['grade']}
            helperText={errors['grade'] ? errors['grade'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('grade', { valueAsNumber: true })}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 1, mb: 2 }}
          >
            Speichern
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
