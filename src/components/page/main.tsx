import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

const StyledMain = styled('main')({
  flexGrow: 1,
  minHeight: '100vh',
});

export default function Main({ children }: PropsWithChildren<unknown>) {
  return (
    <StyledMain>
      <Box>{children}</Box>
    </StyledMain>
  );
}
