import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Groups3TwoToneIcon from '@mui/icons-material/Groups3TwoTone';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useDrawerContext } from '../../context/app-context';

export default function NavBar() {
  const handleDrawerOpen = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const handleChangeTheme = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const { isDrawerOpen, setDrawerOpen } = useDrawerContext();

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
          sx={{ display: { xs: 'flex', md: 'flex', color: '#ffffff' }, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <MuiLink component={Link} href={'/'} underline="none" sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'flex' }, ml: 4 }}
          >
            <Groups3TwoToneIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            STUDYLINK
          </Typography>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              display: { xs: 'flex', sm: 'none', color: '#ffffff' },
              ml: 4,
            }}
          >
            <Groups3TwoToneIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            STUDYLINK
          </Typography>
        </MuiLink>

        <IconButton
          color="inherit"
          aria-label="change theme"
          onClick={handleChangeTheme}
          edge="start"
          sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}
        >
          <Brightness4Icon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
