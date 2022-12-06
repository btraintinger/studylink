import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import { Button } from '@mui/material';

const QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      email
      id
      role
      name
    }
  }
`;

export default function Component() {
  const { data: session, status } = useSession();

  const { data, loading, error } = useQuery(QUERY);

  if (status === 'authenticated') {
    if (session && session.user) {
      return (
        <>
          <h1>Authenticated</h1>
          <p>{session.user.email}</p>
          <Button>abmelden</Button>

          <p>{JSON.stringify(data)}</p>
        </>
      );
    }
  }

  return <Link href="/api/auth/signin">Sign in</Link>;
}
