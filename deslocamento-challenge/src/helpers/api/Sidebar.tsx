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
import { useRouter } from "next/router";

export default function SideBar() {
  const router = useRouter();

  const MenuItems = [
    { name: "Home", icon: <HomeIcon />, route: "/" },
    { name: "Conta", icon: <AccountCircleIcon />, route: "/account" },
    { name: "Corridas", icon: <RouteIcon />, route: "/ride" },
    { name: "Sair", icon: <LogoutIcon />, route: "/sign-in" },
  ];
  return (
    <Box>
      <List>
        {MenuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => router.push(item.route)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
