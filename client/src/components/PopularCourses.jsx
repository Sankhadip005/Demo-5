import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";

function PopularCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        px: 8, // same padding as navbar
        py: 10,
        textAlign: "Left",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h2"
        sx={{ fontWeight: 700, mb: 6 }}
      >
        Popular Courses
      </Typography>

      {/* Course Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
        }}
      >
        {courses.slice(0, 4).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </Box>

      {/* View More Button */}
      <Box sx={{ mt: 6 }}>
        <Button
          component={Link}
          to="/courses"
          variant="contained"
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 600,
            borderRadius: "8px",
            background: "linear-gradient(90deg,#5f6cff,#ff7a18)",
          }}
        >
          VIEW MORE
        </Button>
      </Box>
    </Box>
  );
}

export default PopularCourses;