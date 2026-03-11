import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar({ openLogin, openRegister }) {

  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const gradient = `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const navItem = {
    position: "relative",
    mx: 2,
    textTransform: "none",
    fontWeight: 500,
    color: theme.palette.text.primary,

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -4,
      width: "0%",
      height: "2px",
      background: gradient,
      transition: "width 0.3s ease"
    },

    "&:hover::after": {
      width: "100%"
    }
  };

  /* Custom slow scroll */
  const slowScroll = (element) => {

    const target = element.getBoundingClientRect().top + window.pageYOffset;
    const start = window.pageYOffset;
    const distance = target - start;

    const duration = 1000; // slower scroll
    let startTime = null;

    const animation = (currentTime) => {

      if (!startTime) startTime = currentTime;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, start + distance * progress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }

    };

    requestAnimationFrame(animation);

  };

  /* Scroll helper */
  const scrollToSection = (id) => {

    if (location.pathname !== "/") {

      navigate("/");

      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) slowScroll(section);
      }, 400); // delay before scrolling

    } else {

      const section = document.getElementById(id);
      if (section) slowScroll(section);

    }

  };

  /* Navigation handlers */

  const handleLogo = () => {
    if (token) {
      navigate("/");
    } else {
      scrollToSection("hero");
    }
  };

  const handleCourses = () => {
    token ? navigate("/courses") : scrollToSection("courses");
  };

  const handleAITutor = () => {
    token ? navigate("/ai-tutor") : scrollToSection("aitutor");
  };

  const handleFeatures = () => {
    scrollToSection("features");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 3, md: 10 }
        }}
      >

        {/* Logo */}
        <Typography
          onClick={handleLogo}
          sx={{
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "1.5rem",
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          LearnHub
        </Typography>

        {/* Center Menu */}
        <Box>

          <Button sx={navItem} onClick={handleCourses}>
            Courses
          </Button>

          {!token && (
            <Button sx={navItem} onClick={handleFeatures}>
              Features
            </Button>
          )}

          <Button sx={navItem} onClick={handleAITutor}>
            AI Tutor
          </Button>

          {token && (
            <Button sx={navItem} onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          )}

        </Box>

        {/* Right Buttons */}
        <Box>

          {!token ? (
            <>
              <Button
                variant="outlined"
                onClick={openLogin}
                sx={{
                  mr: 2,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  textTransform: "none"
                }}
              >
                Sign In
              </Button>

              <Button
                variant="contained"
                onClick={openRegister}
                sx={{
                  background: gradient,
                  color: "#fff",
                  textTransform: "none"
                }}
              >
                Get Started
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                textTransform: "none"
              }}
            >
              Logout
            </Button>
          )}

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;