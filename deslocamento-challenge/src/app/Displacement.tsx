import DrawerMenu from "@/components/DrawerMenu";
import Main from "@/components/Main";
import MainHeader from "@/components/MainHeader";
import { fetchGetAllDisplacements } from "@/helpers/api/Displacement";
import {
  DRAWER_WIDTH,
  EMPTY_DISPLACEMENT,
  USER_TYPE,
  WITHOUT_DISPLACEMENT_MESSAGE,
} from "@/helpers/contants";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { Box, CssBaseline, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Displacement as DisplacementType } from "@/types/DisplacementType";
import DisplacementBox from "@/components/DisplacementBox";
import { TailSpin } from "react-loader-spinner";
import TailSpinLoading from "@/components/TailSpinLoading";

export default function Displacement() {
  const { openDrawer, userType, userId, loading, setLoading } =
    useGlobalContext();

  const [windowWidth, setWindowWidth] = useState(0);
  const [displacement, setDisplacement] = useState([EMPTY_DISPLACEMENT]);

  async function fetchDisplacement() {
    const displacementResponse = await fetchGetAllDisplacements();
    if (!displacementResponse.length) {
      return;
    }
    let userDisplacement: DisplacementType[];
    switch (userType) {
      case USER_TYPE.DRIVER:
        userDisplacement = displacementResponse.filter(
          (ride) => ride.idCondutor.toString() === userId
        );
        setDisplacement(userDisplacement);
        break;
      case USER_TYPE.RIDER:
        userDisplacement = displacementResponse.filter(
          (ride) => ride.idCliente.toString() === userId
        );
        setDisplacement(userDisplacement);
        break;
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchDisplacement();
    setWindowWidth(window.screen.availWidth);
    setLoading(false);
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
            Corridas
          </Typography>
          <TailSpinLoading />
          {displacement.length && !loading ? (
            displacement.map((d, index) => (
              <DisplacementBox key={index} d={d} />
            ))
          ) : (
            <Typography variant="h6" component="p" align="center">
              {WITHOUT_DISPLACEMENT_MESSAGE}
            </Typography>
          )}
        </Box>
      </Main>
    </Box>
  );
}
