import * as React from 'react';
import { styled } from '@mui/system';
import { PropsWithChildren } from 'react';

const StyledMain = styled('main')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  alignContent: 'center',
});

export default function Main({ children }: PropsWithChildren<unknown>) {
  return <StyledMain>{children}</StyledMain>;
}
