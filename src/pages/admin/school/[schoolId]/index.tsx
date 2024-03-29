import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField } from '@mui/material';
import { isFQDN } from 'class-validator';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import {
  Department,
  useCreateSchoolMutation,
  useDeleteSchoolMutation,
  useGetSchoolByIdQuery,
  useUpdateSchoolMutation,
} from '../../../../../generated/graphql';
import Layout from '../../../../components/page/layout';
import FormWrapper from '../../../../components/utils/formWrapper';
import LoadingPage from '../../../../components/utils/loadingPage';
import {
  DEPARTMENTS_ADMIN,
  SCHOOL_ADMIN,
} from '../../../../constants/menu-items';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';

const schoolSchema = object({
  name: string().min(1, '* Bitte geben Sie einen Namen an'),
  domain: string()
    .min(1, '* Bitte geben Sie eine Domain an')
    .refine((value) => {
      return isFQDN(value);
    }, '* Bitte geben Sie eine gültige Domain an'),
});

type SchoolInput = TypeOf<typeof schoolSchema>;

export default function School() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [array, setArray] = useState<Department[]>([]);

  // get schoolId from url
  const { schoolId } = router.query;
  let queryId: number | null = parseInt(schoolId as string, 10);
  if (schoolId === 'new') queryId = null;

  // graphql queries and mutations
  const [createFunction] = useCreateSchoolMutation({
    onError: (error) => {
      if (error.message === 'CreationFailedError')
        setErrorMessage('Die Erstellung war nicht möglich');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
      if (error.message === 'AlreadyAdministratingSchoolError')
        setErrorMessage('Sie sind bereits für eine Schule verantwortlich');
    },
    refetchQueries: ['GetAdministeredSchool'],
  });
  const [updateFunction] = useUpdateSchoolMutation({
    onError: (error) => {
      if (error.message === 'UpdateFailedError')
        setErrorMessage('Bei der Aktualisierung ist ein Fehler aufgetreten');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
  });
  const [deleteFunction] = useDeleteSchoolMutation({
    onError: (error) => {
      if (error.message === 'DeletionFailedError')
        setErrorMessage('Bei der Löschung ist ein Fehler aufgetreten');
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
    refetchQueries: ['GetAdministeredSchool'],
  });
  const { loading } = useGetSchoolByIdQuery({
    skip: queryId === null,
    variables: {
      getSchoolByIdId: queryId as number,
    },
    onError: (error) => {
      if (error.message === 'DoesNotExistError') router.push('/404');
      if (error.message === 'NotAuthorizedError') router.push('/401');
    },
    onCompleted: (data) => {
      if (data) {
        reset(data.getSchoolById);
        setArray(data.getSchoolById.departments as Department[]);
      }
    },
  });

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SchoolInput>({
    resolver: zodResolver(schoolSchema),
    mode: 'onTouched',
  });

  const onSubmitHandler: SubmitHandler<SchoolInput> = async (values) => {
    if (queryId === null) {
      const school = await createFunction({
        variables: {
          schoolCreationInput: {
            name: values.name,
            domain: values.domain,
          },
        },
      });
      router.push(`${SCHOOL_ADMIN}/${school?.data?.createSchool.id}`);
    } else {
      await updateFunction({
        variables: {
          schoolUpdateInput: {
            id: queryId,
            name: values.name,
            domain: values.domain,
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

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Kürzel',
      flex: 0.3,
    },
    {
      field: 'longName',
      headerName: 'Name',
      flex: 0.7,
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    router.push(`${DEPARTMENTS_ADMIN}/${params.row.id}`);
  };

  if (loading)
    <Layout role="ADMIN">
      <LoadingPage></LoadingPage>
    </Layout>;

  return (
    <Layout role="ADMIN">
      <FormWrapper>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            sx={{ mb: 2 }}
            label="Name"
            fullWidth
            required
            error={!!errors['name']}
            helperText={errors['name'] ? errors['name'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('name')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Domain"
            fullWidth
            required
            error={!!errors['domain']}
            helperText={errors['domain'] ? errors['domain'].message : ''}
            defaultValue={queryId === null ? '' : ' '} // formatting
            {...register('domain')}
          />
          <Button variant="contained" fullWidth type="submit" sx={{ mb: 2 }}>
            Speichern
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() =>
              router.push({
                pathname: `${DEPARTMENTS_ADMIN}/new`,
                query: { schoolId: queryId },
              })
            }
            disabled={queryId === null}
          >
            Neue Abteilung hinzufügen
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => {
              if (queryId !== null) {
                deleteFunction({
                  variables: {
                    deleteSchoolId: queryId as number,
                  },
                });
                router.push(SCHOOL_ADMIN);
              }
            }}
            disabled={queryId === null}
          >
            Löschen oder Entfernen
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
      <Box sx={{ mt: 5, height: '50vh' }}>
        <DataGrid
          rows={array}
          columns={columns}
          autoPageSize
          pagination
          disableSelectionOnClick
          onRowClick={handleRowClick}
          sx={{
            border: 1,
            borderColor: 'primary.main',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'primary.main',
              fontSize: '1.2rem',
            },
            '& .MuiDataGrid-cell': {
              cursor: 'pointer',
            },
          }}
        ></DataGrid>
      </Box>
    </Layout>
  );
}
