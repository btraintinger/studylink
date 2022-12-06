import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';

const SCHOOL_QUERY = gql`
  query GetSchoolById($getSchoolByIdId: Float!) {
    getSchoolById(id: $getSchoolByIdId) {
      name
      id
      handle
      domain
    }
  }
`;

const CREATE_SCHOOL_MUTATION = gql`
  mutation CreateSchool($schoolCreationInput: SchoolCreationInput!) {
    createSchool(schoolCreationInput: $schoolCreationInput) {
      id
    }
  }
`;

const UPDATE_SCHOOL_MUTATION = gql`
  mutation UpdateSchool($schoolUpdateInput: SchoolUpdateInput!) {
    updateSchool(schoolUpdateInput: $schoolUpdateInput) {
      id
    }
  }
`;

export default function School() {
  const router = useRouter();
  const { schoolId } = router.query;

  let queryId: number | null = parseInt(schoolId as string);

  if (schoolId === 'new') queryId = null;

  const [createFunction] = useMutation(CREATE_SCHOOL_MUTATION);
  const [updateFunction] = useMutation(UPDATE_SCHOOL_MUTATION);

  const { data, loading, error } = useQuery(SCHOOL_QUERY, {
    variables: {
      getSchoolByIdId: 1,
    },
  });

  const schoolSchema = yup.object({
    name: yup.string().required('Email is required'),
    handle: yup.string().required('Password is required'),
    domain: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      handle: data?.getSchoolById.handle || '',
      domain: data?.getSchoolById.domain || '',
      name: data?.getSchoolById.name || '',
    },
    validationSchema: schoolSchema,
    onSubmit: async (values) => {
      if (queryId === null) {
        await createFunction({
          variables: { schoolCreationInput: { ...values } },
        });
      } else {
        await updateFunction({
          variables: { schoolUpdateInput: { id: queryId, ...values } },
        });
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={String(formik.touched.name && formik.errors.name)}
      />
      <TextField
        fullWidth
        id="handle"
        name="handle"
        label="Handle"
        value={formik.values.handle}
        onChange={formik.handleChange}
        error={formik.touched.handle && Boolean(formik.errors.handle)}
        helperText={String(formik.touched.handle && formik.errors.handle)}
      />
      <TextField
        fullWidth
        id="domain"
        name="domain"
        label="Domain"
        value={formik.values.domain}
        onChange={formik.handleChange}
        error={formik.touched.domain && Boolean(formik.errors.domain)}
        helperText={String(formik.touched.domain && formik.errors.domain)}
      />
      <Button variant="contained" fullWidth type="submit" sx={{ mt: 1, mb: 2 }}>
        Speichern
      </Button>
    </Box>
  );
}
