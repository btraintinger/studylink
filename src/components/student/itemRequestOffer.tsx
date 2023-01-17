import { ListItem } from '@mui/material';
import { useRouter } from 'next/router';
interface ItemRequestOfferProps {
  id: number;
  baseRoute: string;
  schoolSubject: string;
  teacher: string;
  grade: number;
  description: string;
}

export default function ItemRequestOffer({
  baseRoute,
  id,
  schoolSubject,
  teacher,
  grade,
}: ItemRequestOfferProps) {
  const router = useRouter();

  const destinationRoute = baseRoute + `/${id}`;

  return (
    <ListItem
      sx={{ margin: 8, padding: 8 }}
      onClick={() => router.push(destinationRoute)}
    >
      Fach: {schoolSubject} Lehrer: {teacher} Jahr: {grade}
    </ListItem>
  );
}
