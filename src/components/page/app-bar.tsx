import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link as MuiLink,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDrawerContext } from '../../context/app-context';
import { useThemeModeContext } from '../../context/mode-context';
import { useState, MouseEvent, useEffect, useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      name
    }
  }
`;
function getInitials(name: string): string {
  if (name) {
    const nameArray = name.split(' ');
    if (nameArray.length > 1) {
      return nameArray[0].charAt(0) + nameArray[1].charAt(0);
    } else {
      return nameArray[0].charAt(0);
    }
  }
  return '';
}

export default function NavBar() {
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const { isDrawerOpen, setDrawerOpen } = useDrawerContext();
  const myColorMode = useThemeModeContext();
  const [name, setName] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, loading, error } = useQuery(USER_QUERY);

  useEffect(() => {
    if (data) {
      setName(getInitials(data.getCurrentUser.name).toUpperCase());
    }
  }, [data]);

  const router = useRouter();

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
        <Button sx={{ mr: 2 }} onClick={handleClick}>
          <Avatar sx={{ bgcolor: '#13cf6a', width: 32, height: 32 }}>
            {name}
          </Avatar>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => router.push('/user')}>Account</MenuItem>
          <MenuItem onClick={() => signOut()}>Ausloggen</MenuItem>
        </Menu>
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
