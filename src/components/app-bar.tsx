import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Groups3TwoToneIcon from '@mui/icons-material/Groups3TwoTone';
import { useAppContext } from '../context/app-context';
import * as ROUTES from '../constants/routes';
import { useTheme } from '@emotion/react';
import { red } from '@mui/material/colors';

export default function NavBar() {
  const handleDrawerOpen = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const { isDrawerOpen, setDrawerOpen } = useAppContext();
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}
        >
          <Groups3TwoToneIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              color: '#D8E9A8',
            }}
          />
        </IconButton>
        <Link style={{ textDecoration: 'none', color: 'primary' }} href="/">
          <Typography variant="h5" color="#D8E9A8">
            STUDYLINK
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
