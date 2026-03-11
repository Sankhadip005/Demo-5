import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4F6BED",
    },
    secondary: {
      main: "#F97316",
    },
    background: {
      default: "#F8FAFC"
    }
  },
  typography: {
    fontFamily: "Inter, sans-serif"
  }
});

export default theme;