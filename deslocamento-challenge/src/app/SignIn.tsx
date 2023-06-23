import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  USER_TYPE,
  SIGN_UP_COMMAND as SIGN_UP,
  SIGN_IN_SUBMIT_BUTTON,
  MISSING_INFORMATION_SIGN_FORM,
  FULL_NAME,
  DOCUMENT,
  ROUTE,
} from "@/helpers/contants";
import Logo from "@/components/Logo";

import AccountTypeOption from "@/components/AccountTypeOptions";
import SignSubmitButton from "@/components/SignSubmitButton";
import { fetchGetAllDrivers } from "@/helpers/api/Driver";
import { fetchGetAllRiders } from "@/helpers/api/Rider";
import ThreeDotsLoading from "@/components/ThreeDotsLoading";
import InputField from "@/components/InputField";

export default function SignIn() {
  const router = useRouter();
  const { userType, setUserId, vehicleId, loading, setLoading } =
    useGlobalContext();

  const isUserTypeDriver = userType === USER_TYPE.DRIVER;

  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();

    const isNotValidUser = !nome.trim().length || !documento.trim().length;
    if (isNotValidUser) {
      return alert(MISSING_INFORMATION_SIGN_FORM);
    }
    let user;
    let res;
    if (isUserTypeDriver) {
      res = await fetchGetAllDrivers();
      user = res.find(
        (user) => user.nome === nome && user.numeroHabilitacao === documento
      );
    } else {
      res = await fetchGetAllRiders();
      user = res.find(
        (user) => user.nome === nome && user.numeroDocumento === documento
      );
    }

    if (!user?.id) {
      setLoading(false);
      return alert("Algo deu errado, tente novamente.");
    }
    setUserId(user?.id);
    setLoading(false);
    if (isUserTypeDriver && !vehicleId) {
      return router.push(ROUTE.VEHICLE);
    }
    router.push(ROUTE.HOME);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginY: 8,
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Logo />
              <AccountTypeOption />
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <InputField
                  name={FULL_NAME}
                  value={nome}
                  handleChange={setNome}
                />
                <InputField
                  name={isUserTypeDriver ? DOCUMENT.CNH : DOCUMENT.CPF}
                  type="password"
                  value={documento}
                  handleChange={setDocumento}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <ThreeDotsLoading /> : SIGN_IN_SUBMIT_BUTTON}
                </Button>
                <SignSubmitButton route={ROUTE.SIGN_UP} command={SIGN_UP} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
