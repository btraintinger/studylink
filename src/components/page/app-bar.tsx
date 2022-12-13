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
import { useAppContext } from '../../context/app-context';
import * as ROUTES from '../../constants/routes';

export default function NavBar() {
  const handleDrawerOpen = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const { isDrawerOpen, setDrawerOpen } = useAppContext();

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
          <MenuIcon />
          <Groups3TwoToneIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
        </IconButton>
        <MuiLink component={Link} href={ROUTES.HOME} underline="none">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            STUDYLINK
          </Typography>
        </MuiLink>
      </Toolbar>
    </AppBar>
  );
}
