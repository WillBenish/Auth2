// FloatingMenu.jsx
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const FloatingMenu = ({onSelect,setSelectedBook,signOut}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const makeSelection = (pageSelection) => {
      toggleSidebar();
    onSelect(pageSelection);
    
    
  };
  
  const signOutUser = ()=>{
    signOut();
  }
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        sx={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar} className="menu-drawer">
        <List className="menu-drawer">
          <ListItem button onClick={()=>{makeSelection('bookshelf')
                                        setSelectedBook(null)}}
                                
          >
            <ListItemText primary="Bookshelf" />
          </ListItem>
          <ListItem button onClick={()=>makeSelection('myBooks')}>
            <ListItemText primary="My Books" />
          </ListItem>
          <ListItem button onClick={()=>makeSelection('social')}>
            <ListItemText primary="Sharing" />
          </ListItem>

          <ListItem button onClick={()=>makeSelection('pagetest')}>
            <ListItemText primary="page test" />
          </ListItem>

          <ListItem button onClick={()=>makeSelection('account')}>
            <ListItemText primary="My Account" />
          </ListItem>
                    <ListItem button onClick={()=>signOutUser()}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default FloatingMenu;
