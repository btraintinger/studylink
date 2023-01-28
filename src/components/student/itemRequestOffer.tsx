import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ISchoolSubject } from '../../types/interfaces';
import { grey, green } from '@mui/material/colors';

interface ItemRequestOfferProps {
  id: number;
  baseRoute: string;
  schoolSubjectNameAbbr: string;
  schoolSubjectNameFull: string;
  teacher: string;
  grade: number;
  description: string;
  displayWidth: number;
}

export default function ItemRequestOffer({
  baseRoute,
  id,
  schoolSubjectNameAbbr,
  schoolSubjectNameFull,
  teacher,
  grade,
  description,
  displayWidth,
}: ItemRequestOfferProps) {
  const theme = useTheme();
  const router = useRouter();

  const destinationRoute = baseRoute + `/${id}`;

  return (
    <ListItem
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => router.push(destinationRoute)}
    >
      <Card elevation={0} sx={{ border: 1, width: 500, height: 80 }}>
        <Grid container>
          <Grid item xs={6}>
            <CardContent>
              <Typography variant="h5" sx={{ p: 0 }}>
                {schoolSubjectNameAbbr}
              </Typography>
              <Typography gutterBottom variant="h6">
                <Link href={baseRoute + `/${id}`}>{schoolSubjectNameFull}</Link>
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={6}>
            <CardActions sx={{ p: 0 }}>
              <Button size="small" sx={{ justifyContent: 'flex-start' }}>
                Share
              </Button>
              <Button size="small">Learn More</Button>
            </CardActions>
            <CardContent sx={{ p: 0 }}>
              <Typography color="text.secondary">{description}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </ListItem>
  );
}
