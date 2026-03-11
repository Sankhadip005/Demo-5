import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useState } from "react";
import CourseModal from "./CourseModal";
import theme from "../theme/theme";

function CourseCard({ course }) {

  const [open, setOpen] = useState(false);

  return (

    <>
      <Card
        sx={{
          width: 320,
          borderRadius: "14px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-6px)"
          }
        }}
      >

        <CardMedia
          component="img"
          height="160"
          image={course.image}
          alt={course.title}
        />

        <CardContent>

          <Typography fontWeight="600">
            {course.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {course.instructor}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            ⭐ {course.rating} • {course.students} students
          </Typography>

          <Typography sx={{ mt: 1, fontWeight: "600" }}>
            ₹{course.price}
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              mt: 2,
              background: "linear-gradient(90deg,#4F6BED,#F97316)",
              textTransform: "none"
            }}
          >
            Explore Now
          </Button>

        </CardContent>

      </Card>

      {/* Course Popup */}
      <CourseModal
        open={open}
        handleClose={() => setOpen(false)}
        course={course}
      />

    </>
  );
}

export default CourseCard;