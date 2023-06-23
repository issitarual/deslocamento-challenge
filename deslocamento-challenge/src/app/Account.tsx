import DrawerMenu from "@/components/DrawerMenu";
import DriverForm from "@/components/DriverForm";
import Main from "@/components/Main";
import MainHeader from "@/components/MainHeader";
import RiderForm from "@/components/RiderForm";
import {
  fetchDeleteDriver,
  fetchGetDriver,
  fetchUpdateDriver,
} from "@/helpers/api/Driver";
import {
  fetchDeleteRider,
  fetchGetRider,
  fetchUpdateRider,
} from "@/helpers/api/Rider";
import { fetchDeleteVehicle } from "@/helpers/api/Vehicle";
import {
  CATEGORIA_HABILITAÇÃO_VALUES,
  DELETE_ACCOUNT,
  DRAWER_WIDTH,
  FULL_NAME,
  MENU_OPTIONS,
  ROUTE,
  UPDATE_ACCOUNT,
  USER_TYPE,
} from "@/helpers/contants";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Account() {
  const { openDrawer, userType, userId, vehicleId, loading, setLoading } =
    useGlobalContext();
  const router = useRouter();

  const [windowWidth, setWindowWidth] = useState(0);

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

  const handleUpdateDriver = async () => {
    await fetchUpdateDriver({
      id: userId,
      nome,
      numeroHabilitacao,
      categoriaHabilitacao,
      vencimentoHabilitacao,
    });
  };
  const handleUpdateRider = async () => {
    await fetchUpdateRider({
      id: userId,
      nome,
      tipoDocumento: "cpf",
      numeroDocumento,
      logradouro,
      numero,
      bairro,
      cidade,
      uf,
    });
  };

  async function fetchDriver(id: string) {
    const driverResponse = await fetchGetDriver(id);
    if (driverResponse) {
      setNome(driverResponse.nome);
      setNumeroHabilitacao(driverResponse.numeroHabilitacao);
      setCategoriaHabilitacao(driverResponse.categoriaHabilitacao);
      setVencimentoHabilitacao(driverResponse.vencimentoHabilitacao);
    }
  }

  async function fetchRider(id: string) {
    const riderResponse = await fetchGetRider(id);
    if (riderResponse) {
      setNome(riderResponse.nome);
      setNumeroDocumento(riderResponse.numeroDocumento);
      setLogradouro(riderResponse.logradouro);
      setNumero(riderResponse.numero);
      setBairro(riderResponse.bairro);
      setCidade(riderResponse.cidade);
      setUF(riderResponse.uf);
    }
  }

  async function handleUpdateAccount() {
    setLoading(true);
    if (isUserTypeDriver) {
      await handleUpdateDriver();
    } else {
      await handleUpdateRider();
    }
    setLoading(false);
    router.push(ROUTE.HOME);
  }

  async function handleDeleteAccount(id: string) {
    setLoading(true);
    if (isUserTypeDriver) {
      await fetchDeleteDriver(id);
      await fetchDeleteVehicle(vehicleId);
    } else {
      await fetchDeleteRider(id);
    }
    setLoading(false);
    router.push(ROUTE.SIGN_IN);
  }

  useEffect(() => {
    setLoading(true);
    if (isUserTypeDriver) {
      fetchDriver(userId);
    } else {
      fetchRider(userId);
    }
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
            {MENU_OPTIONS.ACCOUNT}
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
              id={FULL_NAME}
              label={FULL_NAME}
              name={FULL_NAME}
              autoComplete={FULL_NAME}
              autoFocus
              type="text"
              disabled={loading}
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
            {isUserTypeDriver ? (
              <DriverForm
                disableInput={loading}
                numeroHabilitacao={numeroHabilitacao}
                setNumeroHabilitacao={setNumeroHabilitacao}
                categoriaHabilitacao={categoriaHabilitacao}
                setCategoriaHabilitacao={setCategoriaHabilitacao}
                vencimentoHabilitacao={vencimentoHabilitacao}
                setVencimentoHabilitacao={setVencimentoHabilitacao}
              />
            ) : (
              <RiderForm
                disableInput={loading}
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
              sx={{ paddingY: 2, marginY: 2 }}
              disabled={loading}
              onClick={handleUpdateAccount}
            >
              {UPDATE_ACCOUNT}
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="error"
              disabled={loading}
              sx={{ paddingY: 2 }}
              onClick={() => handleDeleteAccount(userId)}
            >
              {DELETE_ACCOUNT}
            </Button>
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
