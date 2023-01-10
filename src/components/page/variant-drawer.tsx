import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Icon, Link as MuiLink } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDrawerContext } from '../../context/app-context';
import {
  ADMIN_LINKS,
  STUDENT_LINKS,
  COMMON_LINKS,
} from '../../constants/menu-items-list';
import Link from 'next/link';
import { IMenuItem } from '../../types/iMenuItem';
import { useSession } from 'next-auth/react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const { selectedItem, isDrawerOpen, setDrawerOpen, setSelectedItem } =
    useDrawerContext();
  const { data: session, status } = useSession();

  const userRole = session?.user?.role;

  let myLinks: IMenuItem[] = STUDENT_LINKS;
  if (userRole === 'admin') {
    myLinks = ADMIN_LINKS;
  } else if (userRole === 'student') {
    myLinks = STUDENT_LINKS;
  }

  const toggleDrawerOpen = () => {
    if (isDrawerOpen === true) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={isDrawerOpen}
      sx={
        isDrawerOpen
          ? { display: { xs: 'flex', sm: 'flex' } }
          : { display: { xs: 'none', sm: 'flex' } }
      }
    >
      <DrawerHeader>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: { xs: 'none', sm: 'flex' },
            ml: 1,
          }}
        >
          <InstagramIcon />
        </Typography>

        <Typography variant="h6" noWrap letterSpacing={2}>
          STUDYLINK
        </Typography>
        <IconButton onClick={toggleDrawerOpen}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List>
        {ADMIN_LINKS.map(({ text, route, icon }, id) => (
          <ListItem
            key={id}
            disablePadding
            sx={{ display: 'block' }}
            component={Link}
            href={route}
            onClick={() => setSelectedItem(route)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDrawerOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Icon></Icon>
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {COMMON_LINKS.map(({ text, route, icon }, id) => (
          <ListItem
            key={id}
            disablePadding
            sx={{ display: 'block' }}
            component={Link}
            href={route}
            onClick={() => setSelectedItem(route)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDrawerOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {selectedItem === route ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
