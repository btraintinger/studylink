import { Box } from '@mui/material';

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        margin: 10,
        maxWidth: 'md',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}
