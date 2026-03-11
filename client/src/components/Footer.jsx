import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Footer() {

  const theme = useTheme();

  const gradient = `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  return (
    <Box
      sx={{
        px: { xs: 3, md: 10 },
        py: 10,
        background: "#0f0f0f",
        color: "#fff"
      }}
    >

      {/* TOP SECTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 4,
          mb: 8
        }}
      >

        {/* LARGE BRAND */}
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: "50px", md: "74px" },
            letterSpacing: "-1px",
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          LearnHub
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          sx={{
            maxWidth: "520px",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.7)",
            textAlign: "right",
          }}
        >
          Learn smarter with AI-powered courses, expert instructors,
          and personalized learning tools designed for modern education.
        </Typography>

      </Box>


      {/* BOTTOM */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          pt: 0.5,
          height: "10px",
          textAlign: "center"
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            marginTop: 4
          }}
        >
          © 2026 LearnHub. All rights reserved.
        </Typography>
      </Box>

    </Box>
  );
}

export default Footer;