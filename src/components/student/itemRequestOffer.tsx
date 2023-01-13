import { ListItem } from '@mui/material';
import { useRouter } from 'next/router';
import { OFFERS_STUDENT, REQUESTS_STUDENT } from '../../constants/menu-items';

interface ItemRequestOfferProps {
  itemType: 'REQUEST' | 'OFFER';
  id: number;
  schoolSubject: string;
  teacher: string;
  grade: number;
}

export default function ItemRequestOffer({
  itemType,
  id,
  schoolSubject,
  teacher,
  grade,
}: ItemRequestOfferProps) {
  const router = useRouter();

  let destinationRoute: string;
  if ((itemType = 'OFFER')) destinationRoute = OFFERS_STUDENT;
  else destinationRoute = REQUESTS_STUDENT;
  destinationRoute += `/${id}`;

  return (
    <ListItem
      sx={{ margin: 8, padding: 8 }}
      onClick={() => router.push(destinationRoute)}
    >
      Fach: {schoolSubject} Lehrer: {teacher} Jahr: {grade}
    </ListItem>
  );
}
