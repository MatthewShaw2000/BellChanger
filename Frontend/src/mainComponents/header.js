//Packages
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

//Mui packages
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

//Font awesome packages
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons';

//CSS
import '../css/mainComponents.css';



/**
 * Header Component
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns JSX
 */
export default function Header(props)
{
    const [anchorElUser, setAnchorElUser] = useState(null);

    const settings = ['Login'];


    const handleSideBarState = () => props.sideBarHandler();

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const navigate = useNavigate();




    /*
        Desktop header

        Mobile header

        Login botton
    */
    return(
        <header>
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <Typography
                        variant="h1"
                        noWrap
                        onClick={() => navigate('/')}
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/logo.png' alt='' />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <nav>
                            <NavLink activeclassname='active' to='/'><strong>Home</strong></NavLink>
                            <NavLink activeclassname='active' to='/Methods'><strong>Methods</strong></NavLink>
                            <a href='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/method.html?type=changes'><strong>Call Changes</strong></a>
                        </nav>
                    </Box>









                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleSideBarState}
                        color="inherit"
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </IconButton>
                    </Box>

                    <Typography
                        variant="h1"
                        noWrap
                        onClick={() => navigate('/')}
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/logo.png' alt='' />
                    </Typography>









                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
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
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </header>
    );
}