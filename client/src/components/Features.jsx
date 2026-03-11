import { Box, Typography, Card, CardContent } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import InsightsIcon from "@mui/icons-material/Insights";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useTheme } from "@mui/material/styles";

function Features() {

  const theme = useTheme();

  const gradient = `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const features = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 36 }} />,
      title: "AI Tutor",
      desc: "Ask questions anytime and receive instant AI-powered explanations and guidance."
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 36 }} />,
      title: "Expert Courses",
      desc: "Learn from industry-level courses designed by experienced instructors."
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 36 }} />,
      title: "Progress Tracking",
      desc: "Monitor your learning progress and stay motivated with milestones."
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 36 }} />,
      title: "Certificates",
      desc: "Earn certificates upon completion to showcase your skills."
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 36 }} />,
      title: "Interactive Learning",
      desc: "Practice with quizzes, exercises, and real-world coding examples."
    }
  ];

  const cardStyle = {
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-6px)"
    }
  };

  return (
    <Box
      id="features"
      sx={{
        px: { xs: 3, md: 10 },
        py: 12,
        background: "#f9fafc"
      }}
    >

      {/* Heading */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 2
        }}
      >
        Platform Features
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          color: "text.secondary",
          mb: 8
        }}
      >
        Everything you need to learn smarter and faster.
      </Typography>


      {/* FIRST ROW */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          mb: 3,
          flexWrap: "wrap"
        }}
      >
        {features.slice(0, 2).map((feature, index) => (
          <Card
            key={index}
            sx={{
              ...cardStyle,
              width: 660
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 5 }}>

              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  mb: 2,
                  background: gradient,
                  color: "#fff"
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "18px"
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "text.secondary"
                }}
              >
                {feature.desc}
              </Typography>

            </CardContent>
          </Card>
        ))}
      </Box>


      {/* SECOND ROW */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        {features.slice(2).map((feature, index) => (
          <Card
            key={index}
            sx={{
              ...cardStyle,
              width: 430
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 4 }}>

              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  mb: 2,
                  background: gradient,
                  color: "#fff"
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "18px"
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "text.secondary"
                }}
              >
                {feature.desc}
              </Typography>

            </CardContent>
          </Card>
        ))}
      </Box>

    </Box>
  );
}

export default Features;