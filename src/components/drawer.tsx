import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import Container from '@mui/material/Container';
import NextLink from 'next/link';

import Groups3TwoToneIcon from '@mui/icons-material/Groups3TwoTone';
import IconButton from '@mui/material/IconButton';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useAppContext } from '../context/app-context';

const drawerWidth = 240;

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const UPPER_PAGES = [
  { text: 'Home', href: '/', icon: <MailIcon /> },
  { text: 'Create account', href: '/create-account', icon: <MailIcon /> },
  { text: 'Switch MUI Demo', href: '/blog/switch-demo', icon: <MailIcon /> },
  { text: 'Account MUI demo', href: '/blog/sign-up-demo', icon: <MailIcon /> },
];
const LOWER_PAGES = [
  { text: 'About', href: '/', icon: <MailIcon /> },
  { text: 'First Post', href: '/blog/first-post', icon: <MailIcon /> },
];

export default function ClippedDrawer() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  interface AppBarProps extends MuiAppBarProps {
    isDrawerOpen?: boolean;
  }
  const handleDrawerOpen = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const {isDrawerOpen, setDrawerOpen} = useAppContext();

  return (
    <Container>
      <Box sx={{ display: 'flex', border: 1, bgcolor: 'red'}}>
        <CssBaseline />
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
            <Typography variant="h6" noWrap component="div">
              Drawer is {isDrawerOpen}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            display: { xs: 'none', md: 'flex'},
            ...(!isDrawerOpen && { display: 'none' }),
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {UPPER_PAGES.map((page) => (
                <ListItem key={page.text} component={NextLink} href = {page.href} disablePadding passHref>
                  <ListItemButton>
                      <ListItemIcon>{page.icon}</ListItemIcon>
                      <ListItemText primary={page.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {LOWER_PAGES.map((page) => (
                <ListItem key={page.text} component={NextLink} href = {page.href} disablePadding passHref>
                    <ListItemButton>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.text} />
                    </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Container>
  );
}
