import Layout from '../../../components/page/layout';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Matches() {
  return (
    <Layout role="STUDENT">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            It's a Match
          </Typography>
          <Typography variant="h5" component="div">
            Raffael Weilch möchte dir Mathematik Hilfe geben!
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            5AHEL
          </Typography>
          <Typography variant="body2">
            Elektronik
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Layout>
  );
}
