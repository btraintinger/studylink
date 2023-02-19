import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import {
  useCreateTutorRequestMutation,
  useDeleteTutorRequestMutation,
  useGetOfferingRequestFormDataQuery,
  useGetTutorRequestByIdQuery,
  useUpdateTutorRequestMutation,
} from '../../../../../generated/graphql';
import Layout from '../../../../components/page/layout';
import FormWrapper from '../../../../components/utils/formWrapper';
import LoadingPage from '../../../../components/utils/loadingPage';
import ControlledAutocomplete from '../../../../components/utils/controlledAutocomplete';
import {
  OFFERS_STUDENT,
  REQUESTS_STUDENT,
} from '../../../../constants/menu-items';
import wrongNumberToNumber from '../../../../utils/wrongNumberToString';
import {
  getSchoolSubjectOptions,
  getTeacherOptions,
} from '../../../../utils/getOfferRequestOptions';

const tutorRequestSchema = object({
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

type TutorRequestInput = TypeOf<typeof tutorRequestSchema>;

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

  // get tutorRequestId from url
  const { requestId } = router.query;
  let queryId: number | null = parseInt(requestId as string, 10);
  if (requestId === 'new') queryId = null;
  console.log('queryId', queryId);

  // graphql queries and mutations
  const [createFunction] = useCreateTutorRequestMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'CreationFailedError')
        setErrorMessage('Bei der Erstellung ist ein Fehler aufgetreten');
    },
    refetchQueries: ['GetTutorRequests'],
  });
  const [updateFunction] = useUpdateTutorRequestMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
    },
  });
  const [deleteFunction] = useDeleteTutorRequestMutation({
    onError: (error) => {
      if (error?.message === 'DoesNotExistError') router.push('/404');
      if (error?.message === 'NotAuthorizedError') router.push('/401');
      if (error?.message === 'DeletionFailedError')
        setErrorMessage('Bei der Löschung ist ein Fehler aufgetreten');
    },
    refetchQueries: ['GetTutorRequests'],
  });
  const { loading } = useGetTutorRequestByIdQuery({
    skip: queryId === null,
    variables: {
      getTutorRequestByIdId: queryId as number,
    },
    onCompleted: (data) => {
      if (data) {
        const loadedSchoolSubject = {
          id: wrongNumberToNumber(data.getTutorRequestById.schoolSubject.id),
          name: `${data.getTutorRequestById.schoolSubject.name} - ${data.getTutorRequestById.schoolSubject.longName}`,
        };
        const loadedTeacher = {
          id: wrongNumberToNumber(data.getTutorRequestById.teacher.id),
          name: data.getTutorRequestById.teacher.name,
        };
        setDefaultSchoolSubject(loadedSchoolSubject);
        setDefaultTeacher(loadedTeacher);
        reset({
          description: data.getTutorRequestById.description,
          grade: data.getTutorRequestById.grade,
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
            teacherId: values.teacher.id,
            grade: values.grade,
            schoolSubjectId: values.schoolSubject.id,
          },
        },
      });
      router.push(
        `${REQUESTS_STUDENT}/${tutorRequest?.data?.createTutorRequest.id}`
      );
    } else {
      await updateFunction({
        variables: {
          tutorRequestUpdateInput: {
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
              errors['description'] ? errors['description'].message : ''
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
            helperText={errors['grade'] ? errors['grade'].message : ''}
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
            helperText={errors['teacher'] ? errors['teacher'].message : ''}
          />
          <Button variant="contained" fullWidth type="submit" sx={{ mb: 2 }}>
            Speichern
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            disabled={queryId === null}
            onClick={() => {
              if (queryId !== null) {
                deleteFunction({
                  variables: {
                    deleteTutorRequestId: queryId,
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
