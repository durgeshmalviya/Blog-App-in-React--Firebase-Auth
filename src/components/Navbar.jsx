import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import { UserAuth } from '../context/AuthContext';
import ButtonGroup from '@mui/material/ButtonGroup';
import AnimatedLogo from '../pages/Animaton';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    AppBar: {
      background: '#1a3a63',
      color: 'white',
      textDecoration: 'none',
      overflowY: 'hidden',
    },
    Button: {
      fontFamily: '-apple-system',
      color: 'white',
      display: 'block',

    },
  };
  const footerStyles = {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    textAlign: 'center',
  };
  return (<>
  <AnimatedLogo/>
    <AppBar position="fixed" style={styles.AppBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <SettingsEthernetIcon sx={{ display: { xs: 'none', md: 'flex', }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1 rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blog
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}>
              <ButtonGroup style={{ padding: '4px' }}
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained" onClick={handleCloseNavMenu}>

                {user?.email ? (
                  <Button style={{ marginTop: '2px' }}><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Home</Link></Button>
                ) : (
                  <Button style={{ marginTop: '5px' }}><Link to='/Login' style={{ textDecoration: 'none', color: 'white' }}>Sign in</Link></Button>
                )}


                {user?.email ? (
                  <Button style={{ marginTop: '5px' }}><Link to='/Blog' style={{ textDecoration: 'none', color: 'white' }}>Blog</Link></Button>
                ) : (
                  <Button style={{ marginTop: '5px' }}><Link to='/Signup' style={{ textDecoration: 'none', color: 'white' }}>Signup</Link></Button>
                )}


              <Menu
                  sx={{ mt: '45px', }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu} >

                  <ButtonGroup style={{ padding: '4px' }}
                    orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="contained">
                    {user?.email ? (
                      <Button style={{ marginTop: '5px', color: 'white' }} onClick={handleSignOut}>Logout</Button>
                    ) : (
                      <Button style={{ marginTop: '5px', color: 'white' }}> <Link to='/'>Home</Link></Button>
                    )}

                    {user?.email ? (
                      <Button style={{ marginTop: '5px' }}><Link to='/Update' style={{ color: 'white' }}>Profile</Link></Button>
                    ) : (
                      null
                    )}
                  </ButtonGroup>
                </Menu>
              </ButtonGroup>
            </Menu>
          </Box>
          <SettingsEthernetIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blog
          </Typography>
          &nbsp; &nbsp;
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              style={styles.Button}
              onClick={handleCloseNavMenu}>
              {user?.email ? (
                <Link to='/'>Home</Link>
              ) : (
                <Link to='/Login'>Login</Link>
              )}
            </Button>&nbsp;
            <Button
              style={styles.Button}
              onClick={handleCloseNavMenu}>
              {user?.email ? (
               <Link to='/Blog'>Blog</Link>
              ) : (
                <Link to='/Signup'>Signup</Link>
              )}
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, }} >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.email} src={user?.photoURL} style={{}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu} >

              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained">
                {user?.email ? (
                  <Button style={{ marginTop: '5px', color: 'white' }} onClick={handleSignOut}>Logout</Button>
                ) : (
                  <Button style={{ marginTop: '5px', color: 'white' }}> <Link to='/'>Home</Link></Button>
                )}
                {user?.email ? (
                  <Button style={{ marginTop: '5px' }}><Link to='/Update' style={{ color: 'white' }}>Settings</Link></Button>
                ) : (
                  null
                )}
              </ButtonGroup>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  </>);
};

export default Navbar;
