import {
  Box,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Navbar from "../components/Navbar";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CoursePlayer() {

  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [tab, setTab] = useState(0);
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonsFlat, setLessonsFlat] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");


  // ======================
  // FETCH COURSE
  // ======================
  useEffect(() => {

    const fetchCourse = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/courses/${id}`
        );

        const data = res.data;

        setCourse(data);

        const allLessons =
          data.sections?.flatMap(section => section.lessons || []) || [];

        setLessonsFlat(allLessons);

        if (allLessons.length > 0) {
          setCurrentVideo(allLessons[0].video);
          setCurrentLessonIndex(0);
        }

      } catch (err) {
        console.error("Course fetch error:", err);
      }

    };

    fetchCourse();

  }, [id]);


  // ======================
  // PLAY LESSON
  // ======================
  const playLesson = (lesson, index) => {

    if (!lesson?.video) return;

    setCurrentVideo(lesson.video);
    setCurrentLessonIndex(index);

  };


  // ======================
  // UPDATE PROGRESS
  // ======================
  const updateProgress = async () => {

    try {

      const userId = user?._id || user?.id;

      if (!userId) return;

      await axios.put(
        "http://localhost:5000/api/enrollments/progress",
        {
          userId,
          courseId: id
        }
      );

      console.log("Progress updated");

    } catch (err) {

      console.log("Progress update failed", err);

    }

  };


  // ======================
  // AUTOPLAY NEXT LESSON
  // ======================
  const playNextLesson = async () => {

    await updateProgress();

    const nextIndex = currentLessonIndex + 1;

    if (lessonsFlat[nextIndex]) {

      setCurrentVideo(lessonsFlat[nextIndex].video);
      setCurrentLessonIndex(nextIndex);

    }

  };


  // ======================
  // LOADING
  // ======================
  if (!course) {
    return (
      <>
        <Navbar />
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography>Loading course...</Typography>
        </Box>
      </>
    );
  }


  return (

    <>
      <Navbar />

      <Box
        sx={{
          mt: "80px",
          px: { xs: 3, md: 8 },
          py: 5,
          background: "#F8FAFC",
          minHeight: "100vh"
        }}
      >

        {/* TITLE */}
        <Typography variant="h5" fontWeight="bold">
          {course.title}
        </Typography>

        <Typography color="text.secondary" mb={3}>
          {course.level || "All Levels"} • {course.duration || "0h"} • ⭐ {course.rating || 4.5}
        </Typography>


        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 4
          }}
        >

          {/* LEFT SIDE */}
          <Box>

            {/* VIDEO PLAYER */}
            <Box
              sx={{
                width: "100%",
                height: "420px",
                borderRadius: 3,
                overflow: "hidden",
                mb: 3,
                background: "#000"
              }}
            >

              <video
                key={currentVideo}
                controls
                autoPlay
                width="100%"
                height="100%"
                onEnded={playNextLesson}
              >
                <source
                  src={currentVideo || "/demo.mp4"}
                  type="video/mp4"
                />
              </video>

            </Box>


            {/* TABS */}
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              sx={{ mb: 2 }}
            >
              <Tab label="Overview"/>
              <Tab label="Instructor"/>
              <Tab label="FAQ"/>
              <Tab label="Reviews"/>
            </Tabs>


            {tab === 0 && (
              <Typography color="text.secondary">
                {course.overview || "Course overview coming soon."}
              </Typography>
            )}

            {tab === 1 && (
              <Typography color="text.secondary">
                Instructor: {course.instructor || "Instructor"}
              </Typography>
            )}

            {tab === 2 && (
              <Typography color="text.secondary">
                FAQs will be available soon.
              </Typography>
            )}

            {tab === 3 && (
              <Typography color="text.secondary">
                Reviews will appear here.
              </Typography>
            )}

          </Box>


          {/* RIGHT SIDEBAR */}
          <Box
            sx={{
              background: "#fff",
              borderRadius: 3,
              p: 2,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
            }}
          >

            <Typography fontWeight="bold" mb={2}>
              Course Content
            </Typography>

            {(course.sections || []).map((section, sIndex) => (

              <Accordion key={sIndex} defaultExpanded={sIndex === 0}>

                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                  <Typography>{section.title}</Typography>
                </AccordionSummary>

                <AccordionDetails>

                  {(section.lessons || []).map((lesson) => {

                    const flatIndex =
                      lessonsFlat.findIndex(l => l._id === lesson._id);

                    return (

                      <Box
                        key={lesson._id}
                        onClick={() => playLesson(lesson, flatIndex)}
                        sx={{
                          display:"flex",
                          alignItems:"center",
                          mb:1,
                          cursor:"pointer",
                          p:1,
                          borderRadius:1,

                          background:
                            currentLessonIndex === flatIndex
                              ? "#EEF2FF"
                              : "transparent",

                          "&:hover": {
                            background:"#F1F5F9"
                          }
                        }}
                      >

                        <PlayArrowIcon sx={{mr:1,fontSize:18}}/>

                        <Typography variant="body2">
                          {lesson.title} • {lesson.duration}
                        </Typography>

                      </Box>

                    );

                  })}

                </AccordionDetails>

              </Accordion>

            ))}

          </Box>

        </Box>

      </Box>
    </>
  );
}