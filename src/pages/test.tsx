import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import useHasMounted from '../utils/useHasMounted';

const QUERY = gql`
  query GetUser {
    getUser {
      id
      email
    }
  }
`;

export default function Component() {
  const hasMounted = useHasMounted();

  const { data: session, status } = useSession();

  const { data, loading, error } = useQuery(QUERY);

  if (!hasMounted) {
    return null;
  }

  if (status === 'authenticated') {
    if (session && session.user) {
      return (
        <>
          <h1>Authenticated</h1>
          <p>{session.user.email}</p>
          <Link href="/auth/signout">Sign out</Link>
          <p>{JSON.stringify(error)}</p>
          <p>{JSON.stringify(data)}</p>
        </>
      );
    }
  }

  return <Link href="/api/auth/signin">Sign in</Link>;
}
