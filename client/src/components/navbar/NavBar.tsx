import * as React from "react";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function NavBar(props: Props) {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      style={{ height: "100%" }}
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      className="nav-container"
    >
      <Typography textAlign="center" variant="h6" sx={{ my: 2 }}>
        <span className="logo-font">logo</span>{" "}
      </Typography>
      <Divider />
      <List>
        <Link style={{ textDecoration: "none", color: "#2a2828" }} to="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>HOME</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>

        <Link style={{ textDecoration: "none", color: "#2a2828" }} to="/login">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>LOGIN</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "none" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h6"
            align="left"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <span className="logo-font">LOGO</span>
          </Typography>

          <Box
            sx={{
              position: "absolute",
              right: 0,
              display: { xs: "none", sm: "inline" },
            }}
          >
            <List
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Link style={{ textDecoration: "none", color: "#f8f8f8" }} to="/">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText>
                      <HomeIcon />
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "#f8f8f8" }}
                to="/login"
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText>
                      LOGIN
                      <Box
                        component="span"
                        sx={{
                          p: 1,
                          position: "absolute",
                          top: "0",
                          fontSize: "10px",
                          color: "#fafafa",
                        }}
                      >
                        {/* {cartList.length > 0 ? cartList.length : null} */}
                      </Box>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 2 }}></Box>
    </Box>
  );
}
