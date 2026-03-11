import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Chip,
  Rating
} from "@mui/material";

function CourseModal({ open, handleClose, course }) {

  if (!course) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogContent sx={{ p: 5 }}>

        <Box
          sx={{
            display: "flex",
            gap: 6,
            alignItems: "flex-start"
          }}
        >

          {/* LEFT CONTENT */}
          <Box sx={{ flex: 1 }}>

            {/* TITLE */}
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: 700,
                mb: 1
              }}
            >
              {course.title}
            </Typography>

            {/* DESCRIPTION */}
            <Typography
              sx={{
                fontSize: "15px",
                color: "text.secondary",
                mb: 3
              }}
            >
              {course.shortDescription}
            </Typography>

            {/* RATING */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>

              <Rating
                value={course.rating || 4.5}
                precision={0.1}
                readOnly
              />

              <Typography sx={{ ml: 1, fontSize: "14px" }}>
                {course.rating} ({course.students} students)
              </Typography>

            </Box>

            {/* COURSE INFO */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>

              <Chip label={`⏱ ${course.duration || "8h"}`} size="small" />

              <Chip label={`📊 ${course.level || "Beginner"}`} size="small" />

              <Chip label={`👨‍🏫 ${course.instructor}`} size="small" />

            </Box>

            {/* OVERVIEW */}
            <Typography sx={{ fontWeight: 600, mb: 1, fontSize: "16px" }}>
              Course Overview
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                color: "text.secondary",
                mb: 3
              }}
            >
              {course.overview}
            </Typography>

            {/* OBJECTIVES */}
            <Typography sx={{ fontWeight: 600, mb: 1, fontSize: "16px" }}>
              What You'll Learn
            </Typography>

            <Box sx={{ mb: 3 }}>

              {course.objectives?.map((item, i) => (
                <Typography key={i} sx={{ fontSize: "14px", mb: 0.5 }}>
                  ✔ {item}
                </Typography>
              ))}

            </Box>

            {/* STACK */}
            <Typography sx={{ fontWeight: 600, mb: 1, fontSize: "16px" }}>
              Tech Stack
            </Typography>

            <Box sx={{ mb: 4 }}>

              {course.stack?.map((tech, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "inline-block",
                    mr: 1,
                    mb: 1,
                    p: "1px",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(90deg,#4F6BED,#F97316)"
                  }}
                >
                  <Chip
                    label={tech}
                    sx={{
                      background: "#fff",
                      fontSize: "13px"
                    }}
                  />
                </Box>
              ))}

            </Box>

          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ width: 380 }}>

            {/* IMAGE */}
            <Box
              component="img"
              src={course.image}
              alt={course.title}
              sx={{
                width: "100%",
                height: 220,
                borderRadius: "12px",
                objectFit: "cover",
                mb: 3
              }}
            />

            {/* PRICE */}
            <Typography
              sx={{
                fontSize: "26px",
                fontWeight: 700,
                mb: 2
              }}
            >
              ₹{course.price}
            </Typography>

            {/* ENROLL BUTTON */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                background:
                  "linear-gradient(90deg,#4F6BED,#F97316)",
                textTransform: "none",
                fontSize: "25px",
                py: 1.3,
                mb: 3
              }}
            >
              Enroll Now
            </Button>

            {/* INCLUDED */}
            <Typography sx={{ fontWeight: 600, mb: 1, fontSize: "15px" }}>
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