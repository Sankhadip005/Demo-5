import { Box, Typography, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AiTutor({ openLogin }) {

  const theme = useTheme();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const chatRef = useRef(null);

  const gradient = `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const token = localStorage.getItem("token");

  // Auto scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);


  const handleSend = async () => {

    if (!token) {
      openLogin();
      return;
    }

    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };

    setChat((prev) => [...prev, userMessage]);
    setMessage("");

    try {

      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const aiMessage = {
        role: "ai",
        text: res.data.reply
      };

      setChat((prev) => [...prev, aiMessage]);

    } catch (err) {

      setChat((prev) => [
        ...prev,
        { role: "ai", text: "AI failed to respond." }
      ]);

    }

  };


  return (

    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        overflow: "hidden"
      }}
    >

      {/* LEFT SIDE */}
<Box
  sx={{
    flex: 1,
    p: 6,
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }}
>

  {/* BACK BUTTON */}
  <Typography
    sx={{
      cursor: "pointer",
      mb: 3,
      fontSize: "20px"
    }}
    onClick={() => navigate(-1)}
  >
    ← Back
  </Typography>


  <Typography variant="h2" fontWeight="bold" mb={1}>
    AI Tutor
  </Typography>

  <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}>
    Ask questions, get explanations, and learn faster with your AI tutor.
  </Typography>


  {/* 3D MODEL */}
  <Box
    sx={{
      flex: 1,
      width: "100%",
      height: "1500px",
      overflow: "hidden"
    }}
  >

    <spline-viewer
      url="https://prod.spline.design/77pjClmKrgVrx5w9/scene.splinecode"
      style={{
        width: "100%",
        height: "100%"
      }}
    />

  </Box>

</Box>


      {/* RIGHT SIDE CHAT */}
      <Box
        sx={{
          flex: 1.2,
          display: "flex",
          flexDirection: "column",
          p: 4
        }}
      >

        {/* CHAT WINDOW */}
        <Box
          ref={chatRef}
          sx={{
            flex: 1,
            background: "#111",
            borderRadius: 3,
            p: 3,
            mb: 3,
            overflowY: "auto",
            border: "1px solid #222"
          }}
        >

          {chat.length === 0 && (
            <Typography sx={{ color: "#777" }}>
              Ask anything about your course...
            </Typography>
          )}

          {chat.map((msg, index) => (

            <Box
              key={index}
              sx={{
                mb: 2,
                textAlign: msg.role === "user" ? "right" : "left"
              }}
            >

              <Typography
                sx={{
                  display: "inline-block",
                  p: 1.5,
                  borderRadius: 2,
                  maxWidth: "80%",
                  background:
                    msg.role === "user"
                      ? theme.palette.primary.main
                      : "#222"
                }}
              >
                {msg.text}
              </Typography>

            </Box>

          ))}

        </Box>


        {/* INPUT */}
        <Box sx={{ display: "flex", gap: 2 }}>

          <TextField
            fullWidth
            placeholder="Ask anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            sx={{
              input: { color: "#fff" },
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
            onClick={handleSend}
            sx={{
              background: gradient,
              px: 4
            }}
          >
            Ask
          </Button>

        </Box>

      </Box>

    </Box>

  );

}

export default AiTutor;