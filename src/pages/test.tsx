import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Component() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    if (session && session.user) {
      return (
        <>
          <h1>Authenticated</h1>
          <p>{session.user.email}</p>
          <Link href="/auth/signout">Sign out</Link>
        </>
      );
    }
  }

  return <Link href="/api/auth/signin">Sign in</Link>;
}
