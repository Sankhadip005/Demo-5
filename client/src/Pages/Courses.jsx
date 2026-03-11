import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar openLogin={() => {}} openRegister={() => {}} />

      {/* Page Content */}
      <Box
        sx={{
          mt: "80px",
          px: { xs: 3, md: 10 },
          py: 8
        }}
      >

        {/* Heading */}
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          mb={9}
          sx={{
            background: "linear-gradient(90deg,#4F6BED,#F97316)",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
        >
          All Courses
        </Typography>

        {/* Courses Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
              lg: "repeat(4,1fr)"
            },
            gap: "24px"
          }}
        >
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </Box>

      </Box>
    </>
  );
}

export default Courses;