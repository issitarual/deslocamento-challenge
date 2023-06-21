import DrawerMenu from "@/components/DrawerMenu";
import DriverForm from "@/components/DriverForm";
import Main from "@/components/Main";
import MainHeader from "@/components/MainHeader";
import RiderForm from "@/components/RiderForm";
import { fetchGetDriver, fetchUpdateDriver } from "@/helpers/api/Driver";
import { fetchGetRider, fetchUpdateRider } from "@/helpers/api/Rider";
import {
  CATEGORIA_HABILITAÇÃO_VALUES,
  DRAWER_WIDTH,
  EMPTY_DRIVER,
  EMPTY_RIDER,
  USER_TYPE,
} from "@/helpers/contants";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { Driver as DriverType } from "@/types/DriverType";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";

export default function Account() {
  const { openDrawer, userType, userId } = useGlobalContext();

  const [windowWidth, setWindowWidth] = useState(0);

  const [nome, setNome] = useState("");
  const isUserTypeDriver = userType === USER_TYPE.DRIVER;

  // DRIVER
  const [driver, setDriver] = useState(EMPTY_DRIVER);
  const [numeroHabilitacao, setNumeroHabilitacao] = useState("");
  const [categoriaHabilitacao, setCategoriaHabilitacao] = useState(
    CATEGORIA_HABILITAÇÃO_VALUES.A
  );
  const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState("");

  //RIDER
  const [rider, setRider] = useState(EMPTY_RIDER);
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUF] = useState("");

  const handleUpdateDriver = async () => {
    const driverResponse = await fetchUpdateDriver({
      id: userId,
      nome,
      numeroHabilitacao,
      categoriaHabilitacao,
      vencimentoHabilitacao,
    });
  };
  const handleUpdateRider = async () => {
    const driverResponse = await fetchUpdateRider({
      id: userId,
      nome,
      tipoDocumento: "cpf",
      numeroDocumento,
      logradouro,
      numero,
      bairro,
      cidade,
      uf
    });
  };

  async function fetchDriver(id: string) {
    const driverResponse = await fetchGetDriver({ id });
    if (driverResponse) {
      setDriver(driverResponse);
    }
  }

  async function fetchRider(id: string) {
    const riderResponse = await fetchGetRider({ id });
    if (riderResponse) {
      setRider(riderResponse);
    }
  }

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
          <Box
            component="form"
            noValidate
            onSubmit={isUserTypeDriver ? handleUpdateDriver : handleUpdateRider}
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
              sx={{ paddingY: 2, marginY: 2 }}
            >
              Atualizar informações
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="error"
              sx={{ paddingY: 2 }}
            >
              Excluir Conta
            </Button>
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
