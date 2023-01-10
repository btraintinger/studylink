import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import { Typography } from '@mui/material';

const StyledMain = styled('main')({
  flexGrow: 1,
  minHeight: '100vh',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Main({ children }: PropsWithChildren<unknown>) {
  return (
    <StyledMain>
      <Box>{children}</Box>
    </StyledMain>
  );
}
