import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import {
  useCreateTutorOfferingMutation,
  useGetSubjectsOfStudentQuery,
  useGetTeachersOfStudentQuery,
  useGetTutorOfferingByIdQuery,
  useUpdateTutorOfferingMutation,
} from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import FormWrapper from '../../../components/utils/formWrapper';
import LoadingPage from '../../../components/utils/loadingPage';

const tutorOfferingSchema = object({
  description: string()
    .min(1, '* Bitte gib eine Beschreibung von bis zu 1000 Zeichen an')
    .max(1000, '* Bitte gib eine Beschreibung von bis zu 1000 Zeichen an'),
  teacher: object({
    id: number().int().nonnegative('* Bitte wähle einen Lehrer aus'),
  }),
  grade: number()
    .min(1, '* Bitte gib eine Schulstufe an')
    .max(13, '* Bitte gib eine Schulstufe an'),
  schoolSubject: object({
    id: number().int().nonnegative('* Bitte wähle ein Fach aus'),
  }),
});

type TutorOfferingInput = TypeOf<typeof tutorOfferingSchema>;

export default function Offer() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // get tutorOfferingId from url
  const { tutorOfferingId } = router.query;
  let queryId: number | null = parseInt(tutorOfferingId as string, 10);
  if (tutorOfferingId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useCreateTutorOfferingMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'CreationFailedError')
        setErrorMessage('Bei der Erstellung ist ein Fehler aufgetreten');
    },
  });
  const [updateFunction] = useUpdateTutorOfferingMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
    },
  });
  const { loading } = useGetTutorOfferingByIdQuery({
    skip: queryId === null,
    variables: {
      getTutorOfferingByIdId: queryId as number,
    },
    onCompleted: (data) => {
      if (data) reset(data.getTutorOfferingById);
    },
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
    },
  });

  const { data: schoolSubjects } = useGetSubjectsOfStudentQuery();
  const { data: teachers } = useGetTeachersOfStudentQuery();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<TutorOfferingInput>({
    resolver: zodResolver(tutorOfferingSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<TutorOfferingInput> = async (values) => {
    if (queryId === null) {
      const tutorOffering = await createFunction({
        variables: {
          tutorOfferingInputCreation: {
            description: values.description,
            teacherId: values.teacher.id,
            grade: values.grade,
            schoolSubjectId: values.schoolSubject.id,
          },
        },
      });
      router.push(
        `/admin/tutorOffering/${tutorOffering?.data?.createTutorOffering.id}`
      );
    } else {
      await updateFunction({
        variables: {
          tutorOfferingUpdateInput: {
            id: queryId,
            description: values.description,
            teacherId: values.teacher.id,
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
            options={schoolSubjects?.getSubjectsOfStudent || []}
            getOptionLabel={(option: {
              id: number;
              name: string;
              longName: string;
            }) => `${option.name} (${option.longName})`}
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
          <Autocomplete
            sx={{ mb: 2 }}
            disablePortal
            options={teachers?.getTeachersOfStudent || []}
            getOptionLabel={(option: { id: number; name: string }) =>
              option.name
            }
            fullWidth
            renderInput={(params) => <TextField {...params} label="LehrerIn" />}
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
