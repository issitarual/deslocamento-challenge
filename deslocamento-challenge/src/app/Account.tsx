import DrawerMenu from "@/components/DrawerMenu";
import Main from "@/components/Main";
import MainHeader from "@/components/MainHeader";
import { DRAWER_WIDTH } from "@/helpers/contants";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { Box, CssBaseline, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";

export default function Account() {
  const { openDrawer, userType, userId } = useGlobalContext();

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.screen.availWidth);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <CssBaseline />
      <MainHeader />
      <DrawerMenu />
      <Main open={windowWidth < 780 ? false : openDrawer}>
        <Box sx={{ marginTop: "80px", paddingLeft: `${DRAWER_WIDTH}px` }}>
          <Typography
            variant="h5"
            component="h5"
            align="center"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Conta
          </Typography>
        </Box>
      </Main>
    </Box>
  );
}
