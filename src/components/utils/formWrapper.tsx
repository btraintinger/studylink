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
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Box sx={{ maxWidth: 'md' }}>{children}</Box>
    </Box>
  );
}
