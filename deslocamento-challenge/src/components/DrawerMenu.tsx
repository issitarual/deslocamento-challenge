import { DRAWER_WIDTH, USER_TYPE } from "@/helpers/contants";
import DrawerHeader from "./DrawerHeader";
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  List,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RouteIcon from "@mui/icons-material/Route";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";

export default function DrawerMenu() {
  const theme = useTheme();
  const router = useRouter();

  const menuItems = [
    { name: "Home", icon: <HomeIcon />, route: "/" },
    {
      name: "Conta",
      icon: <AccountCircleIcon />,
      route: "/account",
    },
    { name: "Corridas", icon: <RouteIcon />, route: "/displacement" },
    { name: "Sair", icon: <LogoutIcon />, route: "/sign-in" },
  ];
  const { openDrawer, setOpenDrawer, userType } = useGlobalContext();

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  if (userType === USER_TYPE.DRIVER) {
    menuItems.splice(3, 0, {
      name: "Veículo",
      icon: <DirectionsCarIcon />,
      route: "/vehicle",
    });
  }

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={openDrawer}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose();
                router.push(item.route);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
