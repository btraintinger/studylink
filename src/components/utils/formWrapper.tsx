import { Box } from '@mui/material';
import type { ReactElement } from 'react';

export default function FormWrapper({ children }: { children: ReactElement }) {
  return (
    <Box
      sx={{
        topMargin: 10,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 'xl' }}>{children}</Box>
    </Box>
  );
}
