import { Box } from '@mui/material';

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box sx={{ padding: 10 }}>{children}</Box>;
}
