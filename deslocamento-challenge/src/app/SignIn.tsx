import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import {
  USER_TYPE,
  SIGN_UP_COMMAND as SIGN_UP,
  SIGN_IN_SUBMIT_BUTTON,
  ACCOUNT_TYPE_COMMAND,
} from "@/helpers/contants";
import Logo from "@/components/Logo";

export default function SignIn() {
  const { userType, setUserType } = useGlobalContext();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    console.log({
      email: target.email.value,
      password: target.password.value,
    });
  };

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
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="document"
                  label={
                    userType === USER_TYPE.DRIVER ? "Número da habilitação" : "CPF"
                  }
                  type="password"
                  id="document"
                  autoComplete="document"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Lembrar de mim"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {SIGN_IN_SUBMIT_BUTTON}
                </Button>
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Link href="/sign-up" variant="body2">
                      {SIGN_UP}
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
