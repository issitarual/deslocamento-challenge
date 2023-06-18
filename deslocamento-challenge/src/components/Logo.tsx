import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Logo() {
    return (
        <Box display="flex" alignItems="center">
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: "bold" }}
                >
                  Deslocamento App
                </Typography>
                <LocationOnIcon />
              </Box>
    )
}