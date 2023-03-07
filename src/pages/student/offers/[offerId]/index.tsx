import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import {
  useCreateTutorOfferingMutation,
  useDeleteTutorOfferingMutation,
  useGetOfferingRequestFormDataQuery,
  useGetTutorOfferingByIdQuery,
  useUpdateTutorOfferingMutation,
} from '../../../../../generated/graphql';
import Layout from '../../../../components/page/layout';
import FormWrapper from '../../../../components/utils/formWrapper';
import LoadingPage from '../../../../components/utils/loadingPage';
import ControlledAutocomplete from '../../../../components/utils/controlledAutocomplete';
import { OFFERS_STUDENT } from '../../../../constants/menu-items';
import wrongNumberToNumber from '../../../../utils/wrongNumberToString';
import {
  getSchoolSubjectOptions,
  getTeacherOptions,
} from '../../../../utils/getOfferRequestOptions';

const tutorOfferingSchema = object({
  description: string()
    .min(1, '* Bitte gib eine Beschreibung von bis zu 1000 Zeichen an')
    .max(1000, '* Bitte gib eine Beschreibung von bis zu 1000 Zeichen an'),
  teacher: object({
    id: number().int().nonnegative('* Bitte wähle einen Lehrer aus'),
    name: string(),
  }),
  grade: number()
    .min(1, '* Bitte gib eine Schulstufe an')
    .max(13, '* Bitte gib eine Schulstufe an'),
  schoolSubject: object({
    id: number().int().nonnegative('* Bitte wähle ein Fach aus'),
    name: string(),
  }),
});

type TutorOfferingInput = TypeOf<typeof tutorOfferingSchema>;

export default function Offer() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const [defaultSchoolSubject, setDefaultSchoolSubject] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [defaultTeacher, setDefaultTeacher] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // get tutorOfferingId from url
  const { offerId } = router.query;
  let queryId: number | null = parseInt(offerId as string, 10);
  if (offerId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useCreateTutorOfferingMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'CreationFailedError')
        setErrorMessage('Bei der Erstellung ist ein Fehler aufgetreten');
    },
    refetchQueries: ['GetTutorOfferings', 'GetMatchesOfCurrentUser'],
  });
  const [updateFunction] = useUpdateTutorOfferingMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
    },
  });
  const [deleteFunction] = useDeleteTutorOfferingMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'DeletionFailedError')
        setErrorMessage('Bei der Löschung ist ein Fehler aufgetreten');
    },
    refetchQueries: ['GetTutorOfferings', 'GetMatchesOfCurrentUser'],
  });
  const { loading } = useGetTutorOfferingByIdQuery({
    skip: queryId === null,
    variables: {
      getTutorOfferingByIdId: queryId as number,
    },
    onCompleted: (data) => {
      if (data) {
        const loadedSchoolSubject = {
          id: wrongNumberToNumber(data.getTutorOfferingById.schoolSubject.id),
          name: `${data.getTutorOfferingById.schoolSubject.name} - ${data.getTutorOfferingById.schoolSubject.longName}`,
        };
        const loadedTeacher = {
          id: wrongNumberToNumber(data.getTutorOfferingById.teacher.id),
          name: data.getTutorOfferingById.teacher.name,
        };
        setDefaultSchoolSubject(loadedSchoolSubject);
        setDefaultTeacher(loadedTeacher);
        reset({
          description: data.getTutorOfferingById.description,
          grade: data.getTutorOfferingById.grade,
          schoolSubject: loadedSchoolSubject,
          teacher: loadedTeacher,
        });
      }
    },
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
    },
  });

  const { data: formData } = useGetOfferingRequestFormDataQuery();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    control,
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
        `${OFFERS_STUDENT}/${tutorOffering?.data?.createTutorOffering.id}`
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: queryId === null ? 'flex' : 'none' }}>
              <Typography variant="h5">Erzeuge dein neues Offering</Typography>
            </Box>
            <Box sx={{ display: queryId !== null ? 'flex' : 'none' }}>
              <Typography variant="h5">
                Bearbeite dein bestehendes Offering
              </Typography>
            </Box>
          </Box>
          <ControlledAutocomplete
            label="Schulfach"
            name="schoolSubject"
            options={getSchoolSubjectOptions(formData)}
            control={control}
            defaultValue={defaultSchoolSubject}
            error={!!errors['schoolSubject']}
            helperText={
              errors['schoolSubject'] ? errors['schoolSubject'].message : ''
            }
          />
          <TextField
            sx={{ mb: 2 }}
            label="Beschreibung"
            fullWidth
            required
            type="text"
            multiline
            error={!!errors['description']}
            helperText={
              errors['description']
                ? errors['description'].message
                : 'Wie kann ich helfen, was kann ich besonders gut?'
            }
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('description')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Schulstufe"
            fullWidth
            required
            type="number"
            error={!!errors['grade']}
            helperText={
              errors['grade']
                ? errors['grade'].message
                : 'Bis zu welcher Schulstufe kann ich Nachhilfe anbieten?'
            }
            defaultValue={queryId === null ? '' : 1} // formatting
            {...register('grade', { valueAsNumber: true })}
          />
          <ControlledAutocomplete
            label="Lehrkraft"
            name="teacher"
            options={getTeacherOptions(formData)}
            control={control}
            defaultValue={defaultTeacher}
            error={!!errors['teacher']}
            helperText={
              errors['teacher']
                ? errors['teacher'].message
                : 'Welche Lehrkraft habe ich in diesem Fach?'
            }
          />
          <Button variant="contained" fullWidth type="submit" sx={{ mb: 2 }}>
            Speichern
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2, bgcolor: '#f51414' }}
            disabled={queryId === null}
            onClick={() => {
              if (queryId !== null) {
                deleteFunction({
                  variables: {
                    deleteTutorOfferingId: queryId,
                  },
                });
                router.push(OFFERS_STUDENT);
              }
            }}
          >
            Löschen
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
