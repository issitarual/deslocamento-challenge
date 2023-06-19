import { Grid, Link } from "@mui/material";
import { useRouter } from "next/router";

export default function SignSubmitButton({route, command}: { route: string; command: string; }) {
  const router = useRouter();

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Link
          onClick={() => router.push(route)}
          variant="body2"
          sx={{ cursor: "pointer" }}
        >
          {command}
        </Link>
      </Grid>
    </Grid>
  );
}
