import React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openTab, setOpenTab] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async() => {
    localStorage.removeItem('token');
    // Optionally, redirect to the home page or login page
    navigate('/'); // Or wherever you want to redirect after logout  
  }

  const handleOpenTab = () => {
    setOpenTab(true);
  }

  const handleCancel = () => {
    setOpenTab(false);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      // Remove box shadow by targeting the Paper component
    PaperProps={{
      sx: {
        boxShadow: '1px 1px 5px #00000024',
        border: '1px solid #dfdfdf'
      },
    }}
    >
      <MenuItem className='menu-item' style={{fontSize: "1rem", textTransform: 'capitalize', fontFamily: "satoshi"}} onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem className='menu-item' style={{fontSize: "1rem", textTransform: 'capitalize', fontFamily: "satoshi"}} onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem className='menu-item' style={{fontSize: "1rem", textTransform: 'capitalize', fontFamily: "satoshi"}} onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
    
  );
  return (
    <div>
<div className="notificationTab" style={{ right: openTab ? "0%" : "-25%", zIndex: "9" }}>
        <div className="notifications">
            <div className="lable" style={{fontSize:'1rem', padding:"10px", fontWeight:500, display:'flex', justifyContent:'space-between', alignItems: 'center', color:"gray"}}><span>Notification Tab</span> <span><CloseIcon onClick={handleCancel} style={{cursor:"pointer", color: '#fff'}} /></span></div>
        
        <div className="notification-items">
          <span style={{fontWeight:"500", fontSize:".8rem"}}>We have an exciting offer for you</span>
          <div style={{fontSize:".8rem", color:"gray"}} className="message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, modi ipsam dolore iure doloribus impedit?</div>
        </div>

        </div>
     </div>
       <Box sx={{ flexGrow: 1 }} >
      <AppBar
        className="cont-wrapper"
        position="absolute"
        style={{
          backgroundColor: '#FFFFFF',
          color: '#384BFF',
          boxShadow: 'none',
          borderBottom: '1px solid #dfdfdf',
          display:'flex',
        }}
      >
        <Toolbar style={{ backgroundColor: '', height: '12vh' }}>
            <div className="logo-space">
              <span>JOBS</span>
              <span>LOCAL</span>
            </div>
         
<div className="nav-menu" style={{width:"61vw", display: 'flex', justifyContent:"center", alignItems:"center"}}>
<div className="ls" style={{display:'flex', gap:"15px", marginRight:'20px'}}>
<li className='list-ls lx' style={{color: "gray"}}>Prepare</li>
<li className='list-ls lx' style={{color: "gray"}}>Participants</li>
<li className='list-ls lx' style={{color: "gray"}}>Opportunities</li>
</div>
<Search style={{ border: '1px solid #dfdfdf', borderRadius: '500px', width:"auto", boxShadow:'1px 1px 4px #00000010'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              style={{color:"#000"}}
              placeholder="Search jobs here"
            />
          </Search>
</div>
          <Box sx={{ flexGrow: 1 }} />
<div className="acc-buttons">
<Box sx={{ display: { xs: 'none', md: 'flex', gap:15 } }}>
            <IconButton
              color="inherit"
            >
              <Badge badgeContent={18} color="error">
                <NotificationsIcon onClick={handleOpenTab} style={{fontSize: "1.8rem"}} />
              </Badge>
            </IconButton>
            <div id="accountIcon">
            <IconButton
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MenuOpenIcon style={{fontSize: "1.8rem"}}  />
              <div className="mini-pic"></div>
            </IconButton>
            </div>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
         
</div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </div>
  )
}

export default Header
