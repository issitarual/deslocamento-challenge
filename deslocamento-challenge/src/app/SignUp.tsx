import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

import {
  USER_TYPE,
  SIGN_IN_COMMAND as SIGN_IN,
  SIGN_UP_SUBMIT_BUTTON,
  CATEGORIA_HABILITAÇÃO_VALUES,
  MISSING_INFORMATION_SIGN_FORM,
  ERROR_FORM,
  FULL_NAME,
  ROUTE,
} from "@/helpers/contants";
import { fetchPostDriver } from "@/helpers/api/Driver";
import { fetchPostRider } from "@/helpers/api/Rider";

import Logo from "@/components/Logo";
import AccountTypeOption from "@/components/AccountTypeOptions";
import SignSubmitButton from "@/components/SignSubmitButton";
import RiderForm from "@/components/RiderForm";
import DriverForm from "@/components/DriverForm";
import ThreeDotsLoading from "@/components/ThreeDotsLoading";
import InputField from "@/components/InputField";

export default function SignUp() {
  const router = useRouter();
  const { userType, setLoading, loading } = useGlobalContext();

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
    setLoading(true);
    e.preventDefault();

    const isNotValidDriver =
      !nome.trim().length ||
      !numeroHabilitacao.trim().length ||
      !categoriaHabilitacao.trim().length ||
      !vencimentoHabilitacao.trim().length;

    if (isNotValidDriver) {
      setLoading(false);
      return alert(MISSING_INFORMATION_SIGN_FORM);
    }

    const isUserSigneUp = await fetchPostDriver({
      nome,
      numeroHabilitacao,
      categoriaHabilitacao,
      vencimentoHabilitacao,
    });
    setLoading(false);

    isUserSigneUp ? router.push(ROUTE.SIGN_IN) : alert(ERROR_FORM);
  }

  async function handleSubmitRider(e: {
    preventDefault: () => void;
  }): Promise<FormEventHandler<HTMLFormElement> | undefined | void> {
    setLoading(true);
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
      setLoading(false);

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

    isUserSigneUp ? router.push(ROUTE.SIGN_IN) : alert(ERROR_FORM);
    setLoading(false);
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
                <InputField
                  name={FULL_NAME}
                  value={nome}
                  handleChange={setNome}
                />

                {isUserTypeDriver ? (
                  <DriverForm
                    categoriaHabilitacao={categoriaHabilitacao}
                    setCategoriaHabilitacao={setCategoriaHabilitacao}
                    vencimentoHabilitacao={vencimentoHabilitacao}
                    setVencimentoHabilitacao={setVencimentoHabilitacao}
                    numeroHabilitacao={numeroHabilitacao}
                    setNumeroHabilitacao={setNumeroHabilitacao}
                  />
                ) : (
                  <RiderForm
                    numeroDocumento={numeroDocumento}
                    setNumeroDocumento={setNumeroDocumento}
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
                  disabled={loading}
                >
                  {loading ? <ThreeDotsLoading /> : SIGN_UP_SUBMIT_BUTTON}
                </Button>
                <SignSubmitButton route={ROUTE.SIGN_IN} command={SIGN_IN} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
