import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PopularCourses from "../components/PopularCourses";
import Features from "../components/Features";
import AITutor from "../components/AITutor";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

function Home() {

  const location = useLocation();

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  // Scroll to section when URL has hash (#courses, #features, etc.)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar
        openLogin={() => setOpenLogin(true)}
        openRegister={() => setOpenRegister(true)}
      />

      <Box sx={{ mt: "80px" }}>
        <Hero />

        <Box id="courses">
          <PopularCourses />
        </Box>

        <Box id="features">
          <Features />
        </Box>

        <Box id="aitutor">
          <AITutor openLogin={() => setOpenLogin(true)} />
        </Box>
      </Box>

      <Footer />

      <LoginModal
        open={openLogin}
        handleClose={() => setOpenLogin(false)}
        openRegister={() => {
          setOpenLogin(false);
          setOpenRegister(true);
        }}
      />

      <RegisterModal
        open={openRegister}
        handleClose={() => setOpenRegister(false)}
        openLogin={() => {
          setOpenRegister(false);
          setOpenLogin(true);
        }}
      />
    </>
  );
}

export default Home;