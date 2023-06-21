import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, InputLabel, MenuItem, Select } from "@mui/material";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";

import {
  USER_TYPE,
  SIGN_IN_COMMAND as SIGN_IN,
  SIGN_UP_SUBMIT_BUTTON,
  CATEGORIA_HABILITAÇÃO_VALUES,
  MISSING_INFORMATION_SIGN_FORM,
  ERROR_SIGN_FORM,
} from "@/helpers/contants";
import { fetchPostDriver } from "@/helpers/api/Driver";
import { fetchPostRider } from "@/helpers/api/Rider";

import Logo from "@/components/Logo";
import AccountTypeOption from "@/components/AccountTypeOptions";
import SignSubmitButton from "@/components/SignSubmitButton";
import RiderForm from "@/components/RiderForm";
import DriverForm from "@/components/DriverForm";

export default function SignUp() {
  const router = useRouter();
  const { userType } = useGlobalContext();

  const [nome, setNome] = useState("");
  const isUserTypeDriver = userType === USER_TYPE.DRIVER;

  // DRIVER
  const [numeroHabilitacao, setNumeroHabilitacao] = useState("");
  const [categoriaHabilitacao, setCategoriaHabilitacao] = useState(
    CATEGORIA_HABILITAÇÃO_VALUES.A
  );
  const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState("");

  //RIDER
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUF] = useState("");

  async function handleSubmitDriver(e: {
    preventDefault: () => void;
  }): Promise<FormEventHandler<HTMLFormElement> | undefined | void> {
    e.preventDefault();

    const isNotValidDriver =
      !nome.trim().length ||
      !numeroHabilitacao.trim().length ||
      !categoriaHabilitacao.trim().length ||
      !vencimentoHabilitacao.trim().length;

    if (isNotValidDriver) {
      return alert(MISSING_INFORMATION_SIGN_FORM);
    }

    const isUserSigneUp = await fetchPostDriver({
      nome,
      numeroHabilitacao,
      categoriaHabilitacao,
      vencimentoHabilitacao,
    });

    isUserSigneUp ? router.push("/sign-in") : alert(ERROR_SIGN_FORM);
  }

  async function handleSubmitRider(e: {
    preventDefault: () => void;
  }): Promise<FormEventHandler<HTMLFormElement> | undefined | void> {
    e.preventDefault();

    const tipoDocumento = "cpf";
    const isNotValidRider =
      !nome.trim().length ||
      !numeroDocumento.trim().length ||
      !logradouro.trim().length ||
      !numero.trim().length ||
      !bairro.trim().length ||
      !cidade.trim().length ||
      !uf.trim().length;

    if (isNotValidRider) {
      return alert(MISSING_INFORMATION_SIGN_FORM);
    }

    const isUserSigneUp = await fetchPostRider({
      nome,
      numeroDocumento,
      tipoDocumento,
      logradouro,
      numero,
      bairro,
      cidade,
      uf,
    });

    isUserSigneUp ? router.push("/sign-in") : alert(ERROR_SIGN_FORM);
  }
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
                onSubmit={
                  isUserTypeDriver ? handleSubmitDriver : handleSubmitRider
                }
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
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="document"
                  label={isUserTypeDriver ? "Número da habilitação" : "CPF"}
                  type="number"
                  id="document"
                  autoComplete="document"
                  value={isUserTypeDriver ? numeroHabilitacao : numeroDocumento}
                  onChange={(e) => {
                    isUserTypeDriver
                      ? setNumeroHabilitacao(e.target.value)
                      : setNumeroDocumento(e.target.value);
                  }}
                />
                {isUserTypeDriver ? (
                  <DriverForm
                    categoriaHabilitacao={categoriaHabilitacao}
                    setCategoriaHabilitacao={setCategoriaHabilitacao}
                    vencimentoHabilitacao={vencimentoHabilitacao}
                    setVencimentoHabilitacao={setVencimentoHabilitacao}
                  />
                ) : (
                  <RiderForm
                    logradouro={logradouro}
                    setLogradouro={setLogradouro}
                    numero={numero}
                    setNumero={setNumero}
                    bairro={bairro}
                    setBairro={setBairro}
                    cidade={cidade}
                    setCidade={setCidade}
                    uf={uf}
                    setUF={setUF}
                  />
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {SIGN_UP_SUBMIT_BUTTON}
                </Button>
                <SignSubmitButton route={"/sign-in"} command={SIGN_IN} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
