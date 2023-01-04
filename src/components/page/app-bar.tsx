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
import InstagramIcon from '@mui/icons-material/Instagram';
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
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
    >
      <Toolbar sx={{ display: 'flex' }}>
        <MuiLink component={Link} href={'/'} underline="none" sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              display: { xs: 'flex', sm: 'none', color: '#000000' },
              padding: 1,
              justifyContent: 'center',
            }}
          >
            STUDYLINK
          </Typography>
        </MuiLink>

        <IconButton
          color="inherit"
          aria-label="change theme"
          onClick={handleChangeTheme}
          edge="start"
          sx={{ display: { xs: 'flex', color: '#000000' }, mr: 1 }}
        >
          <Brightness4Icon
            sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
