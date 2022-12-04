import { useSession } from 'next-auth/react';
import LoadingPage from '../components/loadingPage';
import NotSignInHome from '../components/home/notSignedInHome';
import AdminHome from '../components/home/adminHome';
import StudentHome from '../components/home/studentHome';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return <NotSignInHome />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (status === 'authenticated' && session?.user?.role === 'STUDENT') {
    return <StudentHome />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
    return <AdminHome />;
  }

  return <LoadingPage />;
}
