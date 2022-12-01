import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const STUDENT_QUERY = gql`
  query getStudent() {
    student() {
      id
    }
  }
`;

export default function StudentHome() {
  const router = useRouter();

  const { data, loading, error } = useQuery(STUDENT_QUERY);

  if (data === null) router.push('/student/new');

  return <> </>;
}
