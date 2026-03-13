import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  return (

    <Box
      id="hero"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pl: { xs: 4, md: 12 },   // left padding only
        pr: 0,                   // remove right padding
        py: { xs: 0, md: 0 },
        background: "#F8FAFC",
        flexWrap: "wrap"
      }}
    >

      {/* LEFT SIDE */}
      <Box
        sx={{
          maxWidth: "600px",
          flex: 1
        }}
      >
      {/* ⭐ BADGE */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2.5,
            py: 1,
            mb: 3,
            width: "fit-content",
            borderRadius: "999px",
            background: "#E8F0FF",
            color: "#2563EB",
            fontWeight: 500,
            fontSize: "14px"
          }}
        >
          ✨ Revolutionize Your Learning
        </Box>

        <Typography variant="h1" fontWeight="bold">
          Learn Smarter,
          <span
            style={{
              background: "linear-gradient(90deg,#4F6BED,#F97316)",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            {" "}Not Harder
          </span>
        </Typography>

        <Typography mt={2} color="text.secondary">
          Transform your future with AI-powered personalized education.
        </Typography>

        <Box mt={3}>

          <Button
            variant="contained"
            onClick={() => navigate("/courses")}   // ✅ link to courses page
            sx={{
              mr: 2,
              background: "linear-gradient(90deg,#4F6BED,#F97316)"
            }}
          >
            Explore Courses
          </Button>

          <Button variant="outlined">
            Watch Demo
          </Button>

        </Box>

      </Box>


      {/* RIGHT SIDE MODEL */}
      <Box
        sx={{
          flex: 1,
          height: { xs: "1000px", md: "850px" },
          width: "100%",
          position: "relative",
          overflow: "hidden"
        }}
      >

        <spline-viewer
          url="https://prod.spline.design/wEOh5wskeiipfneb/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
            display: "block"
          }}
        ></spline-viewer>

      </Box>

    </Box>

  );

}