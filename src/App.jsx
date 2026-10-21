import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import GoalSelection from "./pages/GoalSelection";
import Preferences from "./pages/Preferences";
import Resources from "./pages/Resources";
import Plan from "./pages/Plan";
import Workout from "./pages/Workout";
import Progress from "./pages/Progress";
import WorkoutSession from "./pages/WorkoutSession";
import SimilarUsers from "./pages/SimilarUsers";
import Research from "./pages/Research";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goals" element={<GoalSelection />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/resources" element={<Resources />} />

        <Route path="/plan" element={<Plan />} />
        <Route path="/planning" element={<Plan />} />

        <Route path="/workout" element={<Workout />} />
        <Route path="/workout-session" element={<WorkoutSession />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/similar-users" element={<SimilarUsers />} />
        <Route path="/research" element={<Research />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;