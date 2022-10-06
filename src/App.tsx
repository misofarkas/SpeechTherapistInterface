import "./styles.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import Patients from "./pages/Patients";
import Exercises from "./pages/Exercises";
import CreateExercisePage from "./pages/CreateExercisePage";
import PatientProfile from "./pages/PatientProfile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import theme from "./theme";
import Sidebar from "./components/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import ExerciseResults from "./pages/ExerciseResults";
import UserSettings from "./pages/UserSettings";
import RequireAuth from "./components/RequireAuth";

export const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />

              <Route element={<RequireAuth />}>
                <Route path="/" element={<Patients />} />
                <Route path="/Calendar" element={<CalendarPage />} />
                <Route path="/Exercises" element={<Exercises />} />
                <Route
                  path="/patient-profile/:id"
                  element={<PatientProfile />}
                />
                <Route
                  path="/CreateExercise"
                  element={<CreateExercisePage />}
                />
                <Route
                  path="/ExerciseResults/:id"
                  element={<ExerciseResults />}
                />
                <Route path="/UserSettings" element={<UserSettings />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
};
