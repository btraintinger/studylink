import { Box } from '@mui/material';

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        topMargin: 10,
        maxWidth: 'md',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}
