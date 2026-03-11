import { Box, Typography, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    axios.get("http://localhost:5000/api/enrollments", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCourses(res.data))
    .catch(err => console.log(err));

  }, []);

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

        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Your Learning Progress
        </Typography>


        {courses.length === 0 ? (

          <Typography color="text.secondary">
            You are not enrolled in any courses yet.  
            Explore courses to start learning.
          </Typography>

        ) : (

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 4
            }}
          >

            {courses.map((course) => {

              const progress =
                (course.completedVideos / course.totalVideos) * 100;

              return (
                <Card key={course._id}>

                  <CardContent>

                    <Typography fontWeight="600">
                      {course.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mt: 1 }}
                    >
                      {course.completedVideos} / {course.totalVideos} videos completed
                    </Typography>

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

                    <Typography
                      variant="body2"
                      sx={{ mt: 1 }}
                    >
                      {Math.round(progress)}% completed
                    </Typography>

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