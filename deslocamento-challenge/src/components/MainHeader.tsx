import { Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useRouter } from "next/navigation";

import AppBar from "./AppBar";
import Logo from "./Logo";
import { ROUTE } from "@/helpers/contants";

export default function MainHeader() {
  const { openDrawer, setOpenDrawer } = useGlobalContext();
  const route = useRouter();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  return (
    <AppBar position="fixed" open={openDrawer}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(openDrawer && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Box margin={3} onClick={() => route.push(ROUTE.HOME)}>
          <Logo />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
