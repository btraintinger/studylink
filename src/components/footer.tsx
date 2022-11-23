import { PropsWithChildren } from 'react';
import { Box, useTheme } from '@mui/material';

export const Footer = ({ children }: PropsWithChildren<unknown>) => {
  const theme = useTheme();

  if (!children) {
    return null;
  }

  return (
    <Box
      sx={{
        background: '#1a0f3b',
        color: theme.palette.primary.light,
        padding: theme.spacing(2),
        textAlign: 'center',
        minWidth: '100vw',
      }}
    >
      {children}
    </Box>
  );
};
