import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Chip,
  Rating
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function CourseModal({ open, handleClose, course }) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!course) return null;

  const handleEnroll = async () => {

    try {

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        alert("Please login first");
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id || user.id;
      const courseId = course._id;

      if (!userId || !courseId) {
        console.error("Invalid IDs:", { userId, courseId });
        alert("Invalid enrollment data");
        return;
      }

      console.log("Enrollment Request:", {
        userId,
        courseId
      });

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/enrollments",
        {
          userId,
          courseId
        }
      );

      console.log("Enrollment Success:", res.data);

      alert("Successfully enrolled!");

      navigate(`/course/${courseId}`);

    } catch (err) {

      console.error("Enrollment error:", err.response?.data || err.message);

      const message =
        err.response?.data?.message || "Enrollment failed";

      alert(message);

    } finally {

      setLoading(false);

    }

  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>

      <DialogContent sx={{ p: { xs: 3, md: 5 } }}>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6
          }}
        >

          {/* LEFT SIDE */}
          <Box sx={{ flex: 1 }}>

            <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 1 }}>
              {course.title}
            </Typography>

            <Typography sx={{ fontSize: "15px", color: "text.secondary", mb: 3 }}>
              {course.shortDescription || "No description available"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Rating value={course.rating || 4.5} precision={0.1} readOnly />
              <Typography sx={{ ml: 1, fontSize: "14px" }}>
                {course.rating || 4.5} ({course.students || 0} students)
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
              <Chip label={`⏱ ${course.duration || "8h"}`} size="small" />
              <Chip label={`📊 ${course.level || "Beginner"}`} size="small" />
              <Chip label={`👨‍🏫 ${course.instructor || "Instructor"}`} size="small" />
            </Box>

            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Course Overview
            </Typography>

            <Typography sx={{ fontSize: "14px", color: "text.secondary", mb: 3 }}>
              {course.overview || "Overview not available"}
            </Typography>

            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              What You'll Learn
            </Typography>

            <Box sx={{ mb: 3 }}>
              {course.objectives?.length ? (
                course.objectives.map((item, i) => (
                  <Typography key={i} sx={{ fontSize: "14px", mb: 0.5 }}>
                    ✔ {item}
                  </Typography>
                ))
              ) : (
                <Typography fontSize="14px">
                  Learning outcomes coming soon.
                </Typography>
              )}
            </Box>

            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Tech Stack
            </Typography>

            <Box sx={{ mb: 4 }}>
              {course.stack?.length ? (
                course.stack.map((tech, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "inline-block",
                      mr: 1,
                      mb: 1,
                      p: "1px",
                      borderRadius: "20px",
                      background: "linear-gradient(90deg,#4F6BED,#F97316)"
                    }}
                  >
                    <Chip label={tech} sx={{ background: "#fff", fontSize: "13px" }} />
                  </Box>
                ))
              ) : (
                <Typography fontSize="14px">
                  Stack not specified
                </Typography>
              )}
            </Box>

          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ width: { xs: "100%", md: 380 } }}>

            <Box
              component="img"
              src={course.image || "https://via.placeholder.com/400"}
              alt={course.title}
              sx={{
                width: "100%",
                height: 220,
                borderRadius: "12px",
                objectFit: "cover",
                mb: 3
              }}
            />

            <Typography sx={{ fontSize: "26px", fontWeight: 700, mb: 2 }}>
              ₹{course.price || 0}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={handleEnroll}
              disabled={loading}
              sx={{
                mb: 3,
                py: 1.2,
                fontWeight: 600,
                background: "linear-gradient(90deg,#4F6BED,#F97316)"
              }}
            >
              {loading ? "Enrolling..." : "Enroll Now"}
            </Button>

            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              This course includes
            </Typography>

            <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
              📹 Video lessons
            </Typography>

            <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
              📂 Downloadable resources
            </Typography>

            <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
              🧠 AI Tutor support
            </Typography>

            <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
              📜 Certificate of completion
            </Typography>

          </Box>

        </Box>

      </DialogContent>
    </Dialog>
  );
}

export default CourseModal;