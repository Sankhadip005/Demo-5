import { Box, Typography, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AiTutor({ openLogin }) {

  const theme = useTheme();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const gradient = `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const token = localStorage.getItem("token");

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
        "http://localhost:5000/api/ai",
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
      console.error("AI Error:", err);

      setChat((prev) => [
        ...prev,
        { role: "ai", text: "AI failed to respond." }
      ]);
    }

  };

  return (
    <Box
      id="aitutor"
      sx={{
        px: { xs: 3, md: 10 },
        py: 10,
        display: "flex",
        gap: 6,
        backgroundColor: "#000",
        color: "#fff",
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >

      {/* LEFT SIDE - CHAT */}
      <Box sx={{ flex: 1, maxWidth: "600px" }}>

        <Typography variant="h2" fontWeight="bold" mb={2}>
          AI Tutor
        </Typography>

        <Typography
          sx={{
            mb: 4,
            color: "rgba(255,255,255,0.7)"
          }}
        >
          Ask questions, get explanations, and learn faster with your AI tutor.
        </Typography>

        {/* CHAT WINDOW */}
        <Box
          sx={{
            height: "320px",
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

      {/* RIGHT SIDE - SPLINE */}
      <Box
        sx={{
          flex: 1,
          height: "600px",
          display: { xs: "none", md: "block" }
        }}
      >
        <spline-viewer
          url="https://prod.spline.design/77pjClmKrgVrx5w9/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

    </Box>
  );
}

export default AiTutor;