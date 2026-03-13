import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Dashboard from "./Pages/Dashboard";
import AITutor from "./Pages/AITutor";
import CoursePlayer from "./Pages/CoursePlayer";



function App() {
  return (
    <Router>

      <CssBaseline />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-tutor" element={<AITutor />} />
        <Route path="/course/:id" element={<CoursePlayer />} />

      </Routes>

    </Router>
  );
}

export default App;