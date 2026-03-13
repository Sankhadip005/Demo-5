import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Button,
  IconButton,
  Box,
  Link
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginModal({ open, handleClose, openRegister }) {

  const theme = useTheme();
  const navigate = useNavigate();

  const gradient = `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Save login data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      handleClose();

      navigate("/dashboard");

    } catch (error) {

      console.error("Login error:", error);
      alert("Server error");

    } finally {

      setLoading(false);

    }

  };

  const switchToRegister = () => {

    handleClose();
    openRegister();

  };

  return (

    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>

      <DialogContent sx={{ p: 4, position: "relative" }}>

        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          mb={3}
        >
          Login
        </Typography>

        <Typography variant="body2" mb={1}>
          Email
        </Typography>

        <TextField
          fullWidth
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Typography variant="body2" mb={1}>
          Password
        </Typography>

        <TextField
          fullWidth
          type="password"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box mt={1} mb={3}>
          <Link
            underline="none"
            sx={{
              fontSize: 13,
              color: theme.palette.primary.main,
              cursor: "pointer"
            }}
          >
            Forgot Password?
          </Link>
        </Box>

        <Button
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{
            background: gradient,
            color: "#fff",
            py: 1.2,
            fontWeight: 600,
            mb: 2
          }}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </Button>

        <Typography align="center" variant="body2">
          Not a member?{" "}
          <Link
            onClick={switchToRegister}
            sx={{
              color: theme.palette.primary.main,
              cursor: "pointer"
            }}
          >
            Signup now
          </Link>
        </Typography>

      </DialogContent>

    </Dialog>

  );

}

export default LoginModal;