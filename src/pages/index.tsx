import { useSession } from 'next-auth/react';
import LoadingPage from '../components/loadingPage';
import NotSignInHome from '../components/notSignedInHome';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return <NotSignInHome />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (status === 'authenticated' && session?.user?.role === 'STUDENT') {
    return <h1>Authenticated</h1>;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
    return <h1>Authenticated</h1>;
  }

  return <LoadingPage />;
}
