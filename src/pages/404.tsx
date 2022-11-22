import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained">
        <Link href="/">Back Home</Link>
      </Button>
    </Box>
  );
}
