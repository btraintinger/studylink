import * as Muicon from '@mui/icons-material';
import { Link as MuiLink } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { ADMIN_LINKS, STUDENT_LINKS } from '../../constants/menu-items-list';
import { useDrawerContext } from '../../context/app-context';
import { useThemeModeContext } from '../../context/mode-context';
import { IMenuItem } from '../../types/iMenuItem';

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
  const { selectedItem, isDrawerOpen, setDrawerOpen, setSelectedItem } =
    useDrawerContext();
  const { data: session } = useSession();

  const userRole = session?.user?.role;

  let myLinks: IMenuItem[] = STUDENT_LINKS;
  if (userRole === 'ADMIN') {
    myLinks = ADMIN_LINKS;
  } else if (userRole === 'STUDENT') {
    myLinks = STUDENT_LINKS;
  }

  const toggleDrawerOpen = () => {
    if (isDrawerOpen === true) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  };

  const IconDisplay = (variation, props = {}) => {
    const IconName = Muicon[variation];
    return <IconName {...props} />;
  };

  const myColorMode = useThemeModeContext();

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
        <MuiLink
          component={Link}
          href={'/'}
          passHref
          underline="none"
          sx={{ display: isDrawerOpen ? 'flex' : 'none' }}
        >
          <Typography>
            {myColorMode.mode === 'light' ? (
              <Image
                height={30}
                width={30}
                src="/images/studylink_logo_dark.svg"
                alt="logo"
              />
            ) : (
              <Image
                height={30}
                width={30}
                src="/images/studylink_logo_light.svg"
                alt="logo"
              />
            )}
          </Typography>
        </MuiLink>
        <MuiLink
          component={Link}
          href={'/'}
          passHref
          underline="none"
          sx={{
            display: isDrawerOpen ? 'flex' : 'none',
            ml: 1,
            color: 'primary',
          }}
        >
          <Typography variant="h6" noWrap letterSpacing={2}>
            STUDYLINK
          </Typography>
        </MuiLink>
        <IconButton
          aria-label="open or close sidebar"
          onClick={toggleDrawerOpen}
        >
          {isDrawerOpen ? <Muicon.ChevronLeftRounded /> : <Muicon.Menu />}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List>
        {myLinks.map(({ text, route, icon }, id) => (
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
                  boxShadow:
                    selectedItem === route ? '1px 1px 0px 1px' : 'none',
                }}
              >
                {IconDisplay(icon)}
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
