import "./styles.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import Patients from "./pages/Patients";
import Exercises from "./pages/Exercises";
import CreateExercisePage from "./pages/CreateExercisePage";
import CreateGeneratedExercisePage from "./pages/CreateGeneratedExercisePage";
import PatientProfile from "./pages/PatientProfile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import theme from "./theme";
import Sidebar from "./components/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import { TagProvider } from "./contexts/TagContext";
import { QueryClient, QueryClientProvider } from "react-query";
import ExerciseResults from "./pages/ExerciseResults";
import UserSettings from "./pages/UserSettings";
import RequireAuth from "./components/RequireAuth";
import ExercisePreview from "./pages/ExercisePreview";
import PageNotFound from "./pages/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TagProvider>
              
              <Router>
              <ScrollToTop />
                <Sidebar />
                <Routes>
                  <Route path="/Login" element={<Login />} />
                  <Route path="/SignUp" element={<SignUp />} />

                  <Route element={<RequireAuth />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Patients" element={<Patients />} />
                    <Route path="/Calendar" element={<CalendarPage />} />
                    <Route path="/Exercises" element={<Exercises />} />
                    <Route path="/patient-profile/:id" element={<PatientProfile />} />
                    <Route path="/CreateExercise" element={<CreateExercisePage />} />
                    <Route path="/CreateGeneratedExercise" element={<CreateGeneratedExercisePage />} />
                    <Route path="/ExerciseResults/:type/:id" element={<ExerciseResults />} />
                    <Route path="/ExercisePreview/:type/:id" element={<ExercisePreview />} />
                    <Route path="/UserSettings" element={<UserSettings />} />
                  </Route>

                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Router>
            </TagProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};
