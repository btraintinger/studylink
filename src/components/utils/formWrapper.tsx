import { Box } from '@mui/material';
import type { ReactElement } from 'react';

export default function FormWrapper({ children }: { children: ReactElement }) {
  return (
    <Box
      sx={{
        topMargin: 10,
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Box sx={{ maxWidth: 'md' }}>{children}</Box>
    </Box>
  );
}
