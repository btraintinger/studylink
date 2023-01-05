import { PropsWithChildren } from 'react';
import { Box, Link, Typography, useTheme } from '@mui/material';

export const Footer = ({ children }: PropsWithChildren<unknown>) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        color: theme.palette.primary.light,
        padding: theme.spacing(2),
        textAlign: 'center',
        minWidth: '100vw',
      }}
    >
      {children}
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link color="inherit" href="https://studylink.com/">
          Studylink
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};
