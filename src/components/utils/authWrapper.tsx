import { Box, Container, Theme, useMediaQuery } from '@mui/material';
import type { ReactElement } from 'react';

export default function AuthWrapper({
  children,
}: {
  children: ReactElement[];
}) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const mobileStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const desktopStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <Container maxWidth="md">
      <Box sx={isMobile ? mobileStyle : desktopStyle}>{children}</Box>
    </Container>
  );
}
