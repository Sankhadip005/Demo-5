import {
  Box,
  Typography,
  Card,
  CardContent,
  Button
} from "@mui/material";

import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userId = user?._id || user?.id;


  useEffect(() => {

    if (!token || !userId) {
      navigate("/");
      return;
    }

    const fetchCourses = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/enrollments/${userId}`
        );

        setCourses(res.data || []);

      } catch (err) {

        console.error("Dashboard fetch error:", err);
        setCourses([]);

      } finally {

        setLoading(false);

      }

    };

    fetchCourses();

  }, [navigate, token, userId]);


  return (
    <>
      <Navbar />

      <Box
        sx={{
          mt: "80px",
          px: { xs: 3, md: 10 },
          py: 8
        }}
      >

        <Typography variant="h4" fontWeight="700" mb={6}>
          Your Learning Progress
        </Typography>

        {loading ? (

          <Typography>Loading courses...</Typography>

        ) : courses.length === 0 ? (

          <Typography color="text.secondary">
            You are not enrolled in any courses yet.
          </Typography>

        ) : (

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr"
              },
              gap: 4
            }}
          >

            {courses.map((enroll) => {

              const course = enroll.courseId || {};

              const completed = enroll.completedVideos || 0;
              const total = enroll.totalVideos || 0;

              const progress =
                total > 0 ? (completed / total) * 100 : 0;

              return (

                <Card
                  key={enroll._id}
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)"
                    }
                  }}
                >

                  <CardContent>

                    <Typography fontWeight="600" mb={1}>
                      {course.title || "Course"}
                    </Typography>

                    <Typography variant="body2">
                      {completed} / {total} videos completed
                    </Typography>

                    {/* Progress Bar */}

                    <Box
                      sx={{
                        mt: 2,
                        height: "8px",
                        borderRadius: "6px",
                        background: "#eee",
                        overflow: "hidden"
                      }}
                    >

                      <Box
                        sx={{
                          width: `${progress}%`,
                          height: "100%",
                          background:
                            "linear-gradient(90deg,#4F6BED,#F97316)"
                        }}
                      />

                    </Box>

                    <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                      {Math.round(progress)}% completed
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() =>
                        navigate(`/course/${course._id}`)
                      }
                      sx={{
                        background:
                          "linear-gradient(90deg,#4F6BED,#F97316)",
                        fontWeight: 600
                      }}
                    >
                      Continue Learning
                    </Button>

                  </CardContent>

                </Card>

              );

            })}

          </Box>

        )}

      </Box>
    </>
  );
}

export default Dashboard;