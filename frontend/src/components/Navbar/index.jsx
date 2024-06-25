import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Button,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import TravelfyLogo from "../../assets/images/travelfy-logo-small.png";
import { logoutWS } from "../../services/authWs";
import './NavBar.css'; // Assuming you have header.css for styles

const AppBar = styled("header")({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1px',
  backgroundColor: '#ffffff',
  color: '#fff',
  boxShadow: '2px 2px 7px rgba(198, 198, 198, 0.666)',
  position: 'sticky',
  width: '100%',
  top: 0,
  zIndex: 100,
});

export default function MiniDrawer({ user, ...props }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const defaultPic = "https://bit.ly/3tlE1bC";
  const buttonColor = grey[900];
  const buttonColorHover = grey[800];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logoutWS();
    setAnchorElUser(null);
    props.handleLogout();
    navigate("/login");
  };

  return (
    <AppBar>
      <div className="logo">
        <Link id="logo" to="/">
          <h2 id="title-web">ItineraryPlanner</h2>
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/aroundme">Blogs</Link></li>
          <li><Link to="/mytrips">My Trips</Link></li>
          <li><Link to="/weather">Weather</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          {/* <li><Link to="/contactus">Contact</Link></li> */}
        </ul>
      </nav>
      <div className="buttons">
        {user ? (
          <>
            <Tooltip title="Open Menu">
               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> 
                <Avatar
                  alt="Itinerary Planner User"
                  src={user.profilePic || defaultPic}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={Link}
                to={"/profile"}
                onClick={handleCloseUserMenu}
              >
                <ListItemIcon>
                  <AccountCircleRoundedIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem
                component={Link}
                to={"/changepassword"}
                onClick={handleCloseUserMenu}
              >
                <ListItemIcon>
                  <HttpsRoundedIcon />
                </ListItemIcon>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              onClick={handleLogin}
              variant="contained"
              sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: buttonColorHover } }}
            >
              {/* <AccountCircleRoundedIcon fontSize="small" sx={{mr:1}}/> */}
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              variant="contained"
              sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: buttonColorHover }, ml: 1 }}
            >
             SignUp
            </Button>
          </>
        )}
      </div>
    </AppBar>
  );
}

