import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RouteIcon from "@mui/icons-material/Route";
import { Box } from "@mui/material";

export default function SideBar() {
  const MenuItems = [
    { name: "Home", icon: <HomeIcon /> },
    { name: "Conta", icon: <AccountCircleIcon /> },
    { name: "Corridas", icon: <RouteIcon /> },
    { name: "Sair", icon: <LogoutIcon /> },
  ];
  return (
    <Box>
      <List>
        {MenuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
