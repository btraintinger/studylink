import { Box, Button } from '@mui/material';
import Link from 'next/link';

interface Props {
  link: string;
  linkText: string;
}

export default function NothingFound({ link, linkText }: Props) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Button component={Link} href={link} passHref>
        {linkText}
      </Button>
    </Box>
  );
}
