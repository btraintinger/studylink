import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link as MuiLink,
  Avatar,
} from '@mui/material';
import Link from 'next/link';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDrawerContext } from '../../context/app-context';
import { useThemeModeContext } from '../../context/mode-context';

export default function NavBar() {
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const { isDrawerOpen, setDrawerOpen } = useDrawerContext();
  const myColorMode = useThemeModeContext();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
    >
      <Toolbar sx={{ display: 'flex' }}>
        <IconButton
          color="inherit"
          aria-label="change theme"
          onClick={toggleDrawer}
          edge="start"
          sx={{ display: { xs: 'flex' }, mr: 1 }}
        >
          <ChevronRightIcon
            sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}
          />
        </IconButton>

        <MuiLink component={Link} href={'/'} underline="none" sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              display: { xs: 'flex', sm: 'none' },
              padding: 1,
              justifyContent: 'center',
            }}
          >
            STUDYLINK
          </Typography>
        </MuiLink>

        <Avatar sx={{ mr: 2, bgcolor: '#13cf6a', width: 32, height: 32 }}>
          LS
        </Avatar>

        <IconButton
          color="inherit"
          aria-label="change theme"
          onClick={myColorMode.colorMode.toggleColorMode}
          edge="start"
          sx={{ display: { xs: 'flex' }, mr: 1 }}
        >
          <Brightness4Icon
            sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
