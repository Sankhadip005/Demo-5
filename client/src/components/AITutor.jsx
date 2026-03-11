import { Box, Typography, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function AITutor({ openLogin }) {

  const theme = useTheme();

  const gradient = `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const handleClick = (e) => {
    const token = localStorage.getItem("token");

    if (!token) {
      e.preventDefault();
      openLogin();
    }
  };

  return (
    <Box
      id="aitutor"
      sx={{
        px: { xs: 3, md: 10 },
        py: 12,
        display: "flex",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#000",
        color: "#fff"
      }}
    >

      {/* SPLINE MODEL */}
      <Box
        sx={{
          flex: 1,
          height: "620px",
          display: { xs: "none", md: "block" }
        }}
      >
        <spline-viewer
          url="https://prod.spline.design/77pjClmKrgVrx5w9/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

      {/* AI TUTOR UI */}
      <Box
        sx={{
          flex: 1,
          maxWidth: "520px",
          ml: "auto"
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 900, mb: 4 }}>
          Your<br></br>Personal<br></br>AI Tutor
        </Typography>

        <Typography sx={{ mb: 5, color: "rgba(255,255,255,0.7)" }}>
          Ask questions, get instant explanations, and receive personalized
          learning support powered by AI.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>

          <TextField
            fullWidth
            placeholder="Ask anything about your course..."
            onClick={handleClick}
            sx={{
              input: { color: "#fff", cursor: "pointer" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#666" },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main
                }
              }
            }}
          />

          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              background: gradient,
              px: 4,
              whiteSpace: "nowrap"
            }}
          >
            Ask AI
          </Button>

        </Box>
      </Box>

    </Box>
  );
}

export default AITutor;