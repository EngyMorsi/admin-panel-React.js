import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  useScrollTrigger,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import {
  makeStyles,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { AppBar, Box, Toolbar, Drawer, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({


  logo: {
    marginTop: 30,
    position: "relative",
    maxWidth: "50%",
    maxHeight: "70%",
    flexGrow: 1,
  },
  active: {
    background: theme.palette.primary.main,
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Navbar = (props) => {
 //console.log(props);

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 
  const menuItems = [
    {
      text: "Home",
      path: "/home",
    },
    {
      text: "Admins",
      path: "/admins",
    },
    {
      text: "Login",
      path: "/login",
    },
    {
      text: "Register",
      path: "/signup",
    },
    {
      text: "Messages",
      path: "/messages",
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="fixed"
          elevation={trigger ? 4 : 0}
          style={{
            // backgroundColor: trigger ? "white" : "transparent",
            backgroundColor: "#1769aa",
            boxShadow: trigger
              ? "5px 0px 27px -5px rgba(0, 0, 0, 0.3) !important"
              : undefined,
            minHeight: 100,
            color: "#d19c1d",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                style={{ marginTop: 30 }}
                onClick={handleDrawerOpen}
              >
                <FontAwesomeIcon icon={faBars} />
              </IconButton>

              <Typography variant="h6" className={classes.logo}>
                Admin Panel
              </Typography>
            </Toolbar>
            {props.userInfo?
                <Box display="flex" justifyContent="flex-end">
                <Button onClick={props.logOut} color="inherit">
                  {" "}
                  logout
                </Button>
                </Box>
             : 
             <Box display="flex" justifyContent="flex-end">
             <Button
               onClick={() => {
                 navigate("/login");
               }}
               color="inherit"
             >
               {" "}
               Login
             </Button>
             <Button
               onClick={() => {
                 navigate("/signup");
               }}
               color="inherit"
             >
               {" "}
               Register
             </Button>
           </Box>
            }
              
          
             

          </Container>
        </AppBar>
       
       {props.userInfo ? 
        <Drawer
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {/* {theme.direction === 'ltr'
                        ? <FontAwesomeIcon icon={ faTimes } />
                        : <FontAwesomeIcon icon={ faChevronRight } />
                    } */}

              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </DrawerHeader>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  handleDrawerClose();
                }}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Slider</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/addSlider");
                    handleDrawerClose();
                  }}
                  // className={location.pathname === item.path ? classes.active : null}
                >
                  <ListItemText primary="Add Slider" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/allSlider");
                    handleDrawerClose();
                  }}
                  // className={location.pathname === item.path ? classes.active : null}
                >
                  <ListItemText primary="All Sliders" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>News</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/addNews");
                    handleDrawerClose();
                  }}
                  // className={location.pathname === item.path ? classes.active : null}
                >
                  <ListItemText primary="Add News" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/allNews");
                    handleDrawerClose();
                  }}
                  // className={location.pathname === item.path ? classes.active : null}
                >
                  <ListItemText primary="All News" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Drawer> 
        : ""}
        
       
       
      </Box>
    </>
  );
};

export default Navbar;
