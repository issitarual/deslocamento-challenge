import DrawerMenu from "../components/DrawerMenu";
import DriverForm from "../components/DriverForm";
import InputField from "../components/InputField";
import Main from "../components/Main";
import MainHeader from "../components/MainHeader";
import RiderForm from "../components/RiderForm";
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
  EMPTY_DRIVER,
  EMPTY_RIDER,
  ERROR_FORM,
  FULL_NAME,
  MENU_OPTIONS,
  ROUTE,
  UPDATE_ACCOUNT,
  USER_TYPE,
} from "@/helpers/contants";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
  const { openDrawer, userType, userId, vehicleId, loading, setLoading } =
    useGlobalContext();
  const router = useRouter();

  const isUserTypeDriver = userType === USER_TYPE.DRIVER;

  const [windowWidth, setWindowWidth] = useState(0);

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

  async function handleUpdateAccount() {
    setLoading(true);
    let response;

    if (isUserTypeDriver) {
      response = await fetchUpdateDriver({
        id: userId,
        nome,
        numeroHabilitacao,
        categoriaHabilitacao,
        vencimentoHabilitacao,
      });
    } else {
      response = await fetchUpdateRider({
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
    }

    if (response !== 200) {
      setLoading(false);
      return alert(ERROR_FORM);
    }

    setLoading(false);
    router.push(ROUTE.HOME);
  }

  async function handleDeleteAccount(id: string) {
    setLoading(true);

    if (isUserTypeDriver) {
      const driverResponse = await fetchDeleteDriver(id);
      const vehicleResponse = await fetchDeleteVehicle(vehicleId);

      if (driverResponse !== 200 || vehicleResponse !== 200) {
        setLoading(false);
        return alert(ERROR_FORM);
      }
    } else {
      const riderResponse = await fetchDeleteRider(id);

      if (riderResponse !== 200) {
        setLoading(false);
        return alert(ERROR_FORM);
      }
    }

    setLoading(false);
    router.push(ROUTE.SIGN_IN);
  }

  const fetchAccountData = async (id: string) => {
    setLoading(true);
    if (isUserTypeDriver) {
      const response = await fetchGetDriver(id);

      if (response === EMPTY_DRIVER) {
        return alert(ERROR_FORM);
      }

      setNome(response.nome);
      setNumeroHabilitacao(response.numeroHabilitacao);
      setCategoriaHabilitacao(response.categoriaHabilitacao);
      setVencimentoHabilitacao(response.vencimentoHabilitacao);
    } else {
      const response = await fetchGetRider(id);

      if (response === EMPTY_RIDER) {
        return alert(ERROR_FORM);
      }

      setNome(response.nome);
      setNumeroDocumento(response.numeroDocumento);
      setLogradouro(response.logradouro);
      setNumero(response.numero);
      setBairro(response.bairro);
      setCidade(response.cidade);
      setUF(response.uf);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAccountData(userId);
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
            {MENU_OPTIONS.ACCOUNT}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleUpdateAccount}
            sx={{ mt: 1 }}
          >
            <InputField name={FULL_NAME} value={nome} handleChange={setNome} />
            {isUserTypeDriver ? (
              <DriverForm
                numeroHabilitacao={numeroHabilitacao}
                setNumeroHabilitacao={setNumeroHabilitacao}
                categoriaHabilitacao={categoriaHabilitacao}
                setCategoriaHabilitacao={setCategoriaHabilitacao}
                vencimentoHabilitacao={vencimentoHabilitacao}
                setVencimentoHabilitacao={setVencimentoHabilitacao}
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
