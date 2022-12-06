import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const SCHOOL_QUERY = gql`
  query GetAdministeredSchool($getSchoolByIdId: Float!) {
    getSchoolById(id: $getSchoolByIdId) {
      domain
      admins {
        schoolId
        id
        user {
          email
          id
          name
        }
      }
      handle
      id
      name
      departments {
        id
        name
      }
    }
  }
`;

export default function School() {
  const router = useRouter();
  const { schoolId } = router.query;

  if (schoolId !== 'new') {
  }

  const { data, loading, error } = useQuery(SCHOOL_QUERY, {
    variables: {
      getSchoolByIdId: schoolId,
    },
  });

  return <div>Admin School</div>;
}
