import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddRecipe from '../addrecipe/addrecipe';


const items = [
  {
    title:'profile',
    path:'/profile'
  },
  {
    title:'favourite',
    path:'/favourite'
  }
]


function TopAppBar({n,handle}){

  const [anchorEl, setAnchorEl] = useState(false);

  const [openModal,setOpenModal] = useState(false)

  const handleMenu = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const logOut = ()=>{

    localStorage.removeItem('user')

    navigate('/signup')

    handleClose()

    handle(n+1)

    

  }

  const modalHandler=(isOpen)=>{
    
    setOpenModal(isOpen)

    handle(n+1)

  }

  const navigate = useNavigate()

  return(
<Box sx={{ flexGrow: 1 }}>
  <AddRecipe isOpen={openModal} handleClose={(isOpen)=>modalHandler(isOpen)}/>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
          onClick={()=>{
            navigate('/')
          }}
          >
            Recipe Book
          </Typography>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={()=>{
                  modalHandler(true)
                }}
                color="inherit"
            >
              <Tooltip title='Add Recipe'>
                <AddCircleIcon/>
              </Tooltip>
            </IconButton>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
              <Tooltip title='more options'>
                 <AccountCircle />
              </Tooltip>
            </IconButton>
            <Menu
              id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={anchorEl}
                onClose={handleClose}
              >
                {
                  items.map((i,index)=>{

                    return <MenuItem 
                    onClick={()=>{

                      handleClose()
                    navigate(i.path)                      

                    }}

                    key={index}
                    >
                       {i.title}
                    </MenuItem>

                  })
                }
                <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )

}

export default TopAppBar