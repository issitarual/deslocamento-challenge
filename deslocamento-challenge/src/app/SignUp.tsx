import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, InputLabel, MenuItem, Select } from "@mui/material";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import {
  USER_TYPE,
  SIGN_IN_COMMAND as SIGN_IN,
  ACCOUNT_TYPE_COMMAND,
  SIGN_UP_SUBMIT_BUTTON,
  CATEGORIA_HABILITAÇÃO_VALUES,
  MISSING_INFORMATION_SIGN_FORM,
  ERROR_SIGN_FORM,
} from "@/helpers/contants";
import Logo from "@/components/Logo";
import { fetchPostDriver } from "@/helpers/api/Driver";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { fetchPostRider } from "@/helpers/api/Rider";

export default function SignUp() {
  const router = useRouter();
  const { userType, setUserType } = useGlobalContext();

  const [nome, setNome] = useState("");

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
    if (
      !nome.trim().length ||
      !numeroHabilitacao.trim().length ||
      !categoriaHabilitacao.trim().length ||
      !vencimentoHabilitacao.trim().length
    ) {
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
    const tipoDocumento = "cpf";
    e.preventDefault();

    if (
      !nome.trim().length ||
      !numeroDocumento.trim().length ||
      !logradouro.trim().length ||
      !numero.trim().length ||
      !bairro.trim().length ||
      !cidade.trim().length ||
      !uf.trim().length
    ) {
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
          marginTop: 8,
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
              <Box sx={{ width: "100%" }}>
                <Typography
                  component="h2"
                  variant="body1"
                  align="center"
                  sx={{ my: 2 }}
                >
                  {ACCOUNT_TYPE_COMMAND}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant={
                      userType === USER_TYPE.DRIVER ? "contained" : "outlined"
                    }
                    sx={{ width: "45%" }}
                    startIcon={<EmojiTransportationIcon />}
                    onClick={() => setUserType(USER_TYPE.DRIVER)}
                  >
                    <p>{USER_TYPE.DRIVER}</p>
                  </Button>
                  <Button
                    variant={
                      userType === USER_TYPE.RIDER ? "contained" : "outlined"
                    }
                    sx={{ width: "45%" }}
                    startIcon={<PersonPinIcon />}
                    onClick={() => setUserType(USER_TYPE.RIDER)}
                  >
                    <p>{USER_TYPE.RIDER}</p>
                  </Button>
                </Box>
              </Box>
              <Box
                component="form"
                noValidate
                onSubmit={
                  userType === USER_TYPE.DRIVER
                    ? handleSubmitDriver
                    : handleSubmitRider
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
                  label={
                    userType === USER_TYPE.DRIVER
                      ? "Número da habilitação"
                      : "CPF"
                  }
                  type="number"
                  id="document"
                  autoComplete="document"
                  value={
                    userType === USER_TYPE.DRIVER
                      ? numeroHabilitacao
                      : numeroDocumento
                  }
                  onChange={(e) => {
                    userType === USER_TYPE.DRIVER
                      ? setNumeroHabilitacao(e.target.value)
                      : setNumeroDocumento(e.target.value);
                  }}
                />
                {userType === USER_TYPE.DRIVER ? (
                  <>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      required
                      fullWidth
                      name="document category"
                      label="Categoria da habilitação"
                      type="text"
                      id="document category"
                      autoComplete="document category"
                      onChange={(e) => {
                        setCategoriaHabilitacao(e.target.value);
                      }}
                      value={categoriaHabilitacao}
                    >
                      <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.A}>
                        {CATEGORIA_HABILITAÇÃO_VALUES.A}
                      </MenuItem>
                      <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.B}>
                        {CATEGORIA_HABILITAÇÃO_VALUES.B}
                      </MenuItem>
                      <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.C}>
                        {CATEGORIA_HABILITAÇÃO_VALUES.C}
                      </MenuItem>
                      <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.D}>
                        {CATEGORIA_HABILITAÇÃO_VALUES.D}
                      </MenuItem>
                      <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.E}>
                        {CATEGORIA_HABILITAÇÃO_VALUES.E}
                      </MenuItem>
                    </Select>
                    <InputLabel>Validade</InputLabel>
                    <TextField
                      required
                      fullWidth
                      name="document expiration date"
                      type="date"
                      id="document expiration date"
                      autoComplete="document expiration date"
                      value={vencimentoHabilitacao}
                      onChange={(e) => {
                        setVencimentoHabilitacao(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="adress"
                      label="Logradouro"
                      type="text"
                      id="adress"
                      autoComplete="adress"
                      value={logradouro}
                      onChange={(e) => {
                        setLogradouro(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="adress-number"
                      label="Número"
                      type="text"
                      id="adress-number"
                      autoComplete="adress-number"
                      value={numero}
                      onChange={(e) => {
                        setNumero(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="adress-district"
                      label="Bairro"
                      type="text"
                      id="adress-district"
                      autoComplete="adress-district"
                      value={bairro}
                      onChange={(e) => {
                        setBairro(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="adress-city"
                      label="Cidade"
                      type="text"
                      id="adress-city"
                      autoComplete="adress-city"
                      value={cidade}
                      onChange={(e) => {
                        setCidade(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="adress-state"
                      label="Estado"
                      type="text"
                      id="adress-state"
                      autoComplete="adress-state"
                      value={uf}
                      onChange={(e) => {
                        setUF(e.target.value);
                      }}
                    />
                  </>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {SIGN_UP_SUBMIT_BUTTON}
                </Button>
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Link href="/sign-in" variant="body2">
                      {SIGN_IN}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
