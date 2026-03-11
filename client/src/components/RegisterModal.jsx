import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Button,
  IconButton,
  Link
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

function RegisterModal({ open, handleClose, openLogin }) {

  const theme = useTheme();
  const gradient = `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {

    try{

      const res = await fetch("http://localhost:5000/api/auth/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      if(res.ok){

        alert("Registration successful");

        handleClose();
        openLogin();

      }else{

        alert(data.message);

      }

    }catch(error){

      console.log(error);
      alert("Server error");

    }

  };

  const switchToLogin = () => {

    handleClose();
    openLogin();

  };

  return (

    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>

      <DialogContent sx={{ p:4, position:"relative" }}>

        <IconButton
        onClick={handleClose}
        sx={{ position:"absolute", right:8, top:8 }}
        >
          <CloseIcon/>
        </IconButton>

        <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        mb={3}
        >
          Signup Form
        </Typography>

        <Typography variant="body2" mb={1}>
          Name
        </Typography>

        <TextField
        fullWidth
        size="small"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        sx={{ mb:2 }}
        />

        <Typography variant="body2" mb={1}>
          Email
        </Typography>

        <TextField
        fullWidth
        size="small"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        sx={{ mb:2 }}
        />

        <Typography variant="body2" mb={1}>
          Password
        </Typography>

        <TextField
        fullWidth
        type="password"
        size="small"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        sx={{ mb:3 }}
        />

        <Button
        fullWidth
        onClick={handleRegister}
        sx={{
          background:gradient,
          color:"#fff",
          py:1.2,
          fontWeight:600,
          mb:2
        }}
        >
          REGISTER
        </Button>

        <Typography align="center" variant="body2">
          Already have an account?{" "}
          <Link
          onClick={switchToLogin}
          sx={{
            color:theme.palette.primary.main,
            cursor:"pointer"
          }}
          >
            Login now
          </Link>
        </Typography>

      </DialogContent>

    </Dialog>

  );

}

export default RegisterModal;