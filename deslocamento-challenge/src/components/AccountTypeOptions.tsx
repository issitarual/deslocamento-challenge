import { ACCOUNT_TYPE_COMMAND, USER_TYPE } from "@/helpers/contants";
import { Box, Button, Typography } from "@mui/material";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useGlobalContext } from "@/hooks/useGlobalContext ";

export default function AccountTypeOption() {
  const { userType, setUserType } = useGlobalContext();
  const isUserTypeDriver = userType === USER_TYPE.DRIVER;
  return (
    <Box sx={{ width: "100%" }}>
      <Typography component="h2" variant="body1" align="center" sx={{ my: 2 }}>
        {ACCOUNT_TYPE_COMMAND}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant={isUserTypeDriver ? "contained" : "outlined"}
          sx={{ width: "45%" }}
          startIcon={<EmojiTransportationIcon />}
          onClick={() => setUserType(USER_TYPE.DRIVER)}
        >
          <p>{USER_TYPE.DRIVER}</p>
        </Button>
        <Button
          variant={userType === USER_TYPE.RIDER ? "contained" : "outlined"}
          sx={{ width: "45%" }}
          startIcon={<PersonPinIcon />}
          onClick={() => setUserType(USER_TYPE.RIDER)}
        >
          <p>{USER_TYPE.RIDER}</p>
        </Button>
      </Box>
    </Box>
  );
}
