import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export function MarketingLogo() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ flexDirection: 'column' }}
    >
      <Typography
        sx={{
          fontSize: 48,
          textAlign: 'center',
          display: 'block',
        }}
      >
        STUDYLINK
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          textAlign: 'center',
          display: 'block',
        }}
      >
        Die schulinterne Nachhilfeplattform
      </Typography>
      <Image
        src={'/favicon.ico'}
        alt="Studylink logo"
        height={150}
        width={150}
      />
    </Box>
  );
}
