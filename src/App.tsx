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

export const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Patients />} />
            <Route path="/Calendar" element={<CalendarPage />} />
            <Route path='/Exercises' element={<Exercises/>}/>
            <Route path='/patient-profile/:id' element={<PatientProfile/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/CreateExercise' element={<CreateExercisePage/>}/>
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
};
