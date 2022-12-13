import { useSession } from 'next-auth/react';
import LoadingPage from '../components/utils/loadingPage';
import NotSignInHome from '../components/home/notSignedInHome';
import AdminHome from '../components/home/adminHome';
import StudentHome from '../components/home/studentHome';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return <NotSignInHome />;
  }

  if (status === 'loading') return <LoadingPage />;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userRole = session?.user?.role;

  if (userRole === 'STUDENT') {
    return <StudentHome />;
  }

  if (userRole === 'ADMIN') {
    return <AdminHome />;
  }
}
