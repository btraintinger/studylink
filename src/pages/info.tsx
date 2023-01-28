import { Button } from '@mui/material';
import Link from 'next/link';

export default function InfoPage() {
  return (
    <Button
      variant="contained"
      sx={{ m: 1 }}
      component={Link}
      href="/auth/signup"
      passHref
    >
      Administrator Registrierung
    </Button>
  );
}
