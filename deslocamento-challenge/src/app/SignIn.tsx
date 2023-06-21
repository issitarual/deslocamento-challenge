import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  USER_TYPE,
  SIGN_UP_COMMAND as SIGN_UP,
  SIGN_IN_SUBMIT_BUTTON,
  MISSING_INFORMATION_SIGN_FORM,
} from "@/helpers/contants";
import Logo from "@/components/Logo";

import AccountTypeOption from "@/components/AccountTypeOptions";
import SignSubmitButton from "@/components/SignSubmitButton";
import { fetchGetAllDrivers } from "@/helpers/api/Driver";
import { fetchGetAllRiders } from "@/helpers/api/Rider";

export default function SignIn() {
  const router = useRouter();
  const { userType, setUserId } = useGlobalContext();

  const isUserTypeDriver = userType === USER_TYPE.DRIVER;

  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
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
      return alert("Algo deu errado, tente novamente.");
    }
    setUserId(user?.id);
    router.push(`user/${user?.id}`);
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome completo"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="document"
                  label={isUserTypeDriver ? "Número da habilitação" : "CPF"}
                  type="password"
                  id="document"
                  autoComplete="document"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {SIGN_IN_SUBMIT_BUTTON}
                </Button>
                <SignSubmitButton route={"/sign-up"} command={SIGN_UP} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
