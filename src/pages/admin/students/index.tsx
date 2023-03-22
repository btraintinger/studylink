import { Box, Button } from '@mui/material';
import Layout from '../../../components/page/layout';
import { useGetAdministeredStudentsQuery } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { STUDENTS_ADMIN } from '../../../constants/menu-items';
import { useState } from 'react';

interface StudentListItem {
  id: number;
  name: string;
  email: string;
  schoolClass: string;
  department: string;
}

export default function Students() {
  const router = useRouter();
  const [array, setArray] = useState<StudentListItem[]>([]);

  const { loading } = useGetAdministeredStudentsQuery({
    onCompleted: (data) => {
      if (data) {
        const temp: StudentListItem[] = [];
        data.getAdministeredSchool.departments.map((department) => {
          department.schoolClasses.map((schoolClass) => {
            schoolClass.students.map((student) => {
              temp.push({
                id: student.id,
                name: student.user.name,
                email: student.user.email,
                schoolClass: schoolClass.name,
                department: department.name,
              });
            });
          });
        });
        setArray(temp);
      }
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Kürzel',
      flex: 0.2,
    },
    {
      field: 'email',
      headerName: 'E-Mail',
      flex: 0.3,
    },
    {
      field: 'schoolClass',
      headerName: 'Klasse',
      flex: 0.25,
    },
    {
      field: 'department',
      headerName: 'Abteilung',
      flex: 0.25,
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    router.push(`${STUDENTS_ADMIN}/${params.row.id}`);
  };

  if (loading)
    return (
      <Layout role="ADMIN">
        <LoadingPage />
      </Layout>
    );

  return (
    <Layout role="ADMIN">
      <Box sx={{ height: '80vh', width: '100%' }}>
        <Button
          variant="contained"
          sx={{
            mb: 2,
            alignSelf: 'center',
            borderRadius: 100,
          }}
          fullWidth
          onClick={() => {
            router.push(`${STUDENTS_ADMIN}/new`);
          }}
        >
          Neuen Schüler hinzufügen
        </Button>
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
