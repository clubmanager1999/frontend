import './App.css';
import { useAuth } from 'react-oidc-context';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, NavLink } from 'react-router-dom';
import { routes } from './routes';
const drawerWidth = 190;

function navLink(name: string, path: string, icon: JSX.Element) {
  return (
    <ListItem disablePadding key={path}>
      <ListItemButton component={NavLink} to={path}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText className="app-drawer-active" primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

function navCallback(name: string, callback: () => void, icon: JSX.Element) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} onClick={callback} />
      </ListItemButton>
    </ListItem>
  );
}

function App() {
  const auth = useAuth();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          <Toolbar />
          <Divider />
          <List sx={{ height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {routes.map((route) => {
                if (route.path && route.navEntry) {
                  return navLink(
                    route.navEntry.title,
                    route.path,
                    route.navEntry.icon,
                  );
                }
              })}

              <Box sx={{ marginTop: 'auto' }}>
                {navCallback(
                  'Log out',
                  () => auth.removeUser(),
                  <LogoutIcon />,
                )}
              </Box>
            </Box>
          </List>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
