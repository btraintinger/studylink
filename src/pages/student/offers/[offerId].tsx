import { gql, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import Layout from '../../../components/page/layout';
import FormWrapper from '../../../components/utils/formWrapper';
import LoadingPage from '../../../components/utils/loadingPage';

const TUTOR_OFFERING_QUERY = gql`
  query GetTutorOfferingById($getTutorOfferingByIdId: Float!) {
    getTutorOfferingById(id: $getTutorOfferingByIdId) {
      description
      teacher
      grade
      schoolSubject {
        extendedName
        name
        id
      }
    }
  }
  query GetSubjectsOfStudent {
    getSubjectsOfStudent {
      id
      extendedName
      name
    }
  }
`;

const CREATE_TUTOR_OFFERING_MUTATION = gql`
  mutation CreateTutorOffering(
    $tutorOfferingInputCreation: TutorOfferingInputCreation!
  ) {
    createTutorOffering(
      TutorOfferingInputCreation: $tutorOfferingInputCreation
    ) {
      id
    }
  }
`;

const UPDATE_TUTOR_OFFERING_MUTATION = gql`
  mutation UpdateTutorOffering(
    $tutorOfferingUpdateInput: TutorOfferingUpdateInput!
  ) {
    updateTutorOffering(TutorOfferingUpdateInput: $tutorOfferingUpdateInput) {
      id
    }
  }
`;

const tutorOfferingSchema = object({
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

type TutorOfferingInput = TypeOf<typeof tutorOfferingSchema>;

export default function Offer() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  // get tutorOfferingId from url
  const { tutorOfferingId } = router.query;
  let queryId: number | null = parseInt(tutorOfferingId as string, 10);
  if (tutorOfferingId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useMutation(CREATE_TUTOR_OFFERING_MUTATION);
  const [updateFunction] = useMutation(UPDATE_TUTOR_OFFERING_MUTATION);
  const { data, loading, error, refetch } = useQuery(TUTOR_OFFERING_QUERY, {
    variables: {
      getTutorOfferingByIdId: queryId,
    },
  });

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<TutorOfferingInput>({
    resolver: zodResolver(tutorOfferingSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (data) {
      reset(data.getTutorOfferingById);
    }
  }, [data]);

  useEffect(() => {
    if (error?.message === 'DoesNotExistError') router.push('/404');
    if (error?.message === 'NotAuthorizedError') router.push('/401');
    if (error?.message === 'CreationFailedError')
      setErrorMessage('Die Erstellung war nicht möglich');
    if (error?.message === 'UpdateFailedError')
      setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
  }, [error]);

  const onSubmitHandler: SubmitHandler<TutorOfferingInput> = async (values) => {
    if (queryId === null) {
      const tutorOffering = await createFunction({
        variables: {
          tutorOfferingCreationInput: {
            description: values.description,
            teacher: values.teacher,
            grade: values.grade,
            schoolSubjectId: values.schoolSubject.id,
          },
        },
      });
      router.push(
        `/admin/tutorOffering/${tutorOffering.data.createTutorOffering.id}`
      );
    } else {
      await updateFunction({
        variables: {
          tutorOfferingUpdateInput: {
            id: queryId,
            description: values.description,
            teacher: values.teacher,
            grade: values.grade,
            schoolSubjectId: values.schoolSubject.id,
          },
        },
      });
      refetch();
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
            renderInput={(params) => <TextField {...params} label="Klasse" />}
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
            {...register('grade')}
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
