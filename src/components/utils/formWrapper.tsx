import { Box } from '@mui/material';

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box sx={{ marginTop: 10 }}>{children}</Box>;
}
