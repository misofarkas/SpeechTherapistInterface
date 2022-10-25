import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container, Textarea, Text, Heading, Flex, Box, Link, useMediaQuery } from "@chakra-ui/react";
import PatientExercises from "../components/PatientExercises";
import PatientCard from "../components/PatientCard";
import { useAuth } from "../contexts/AuthContext";
import { getPatient } from "../api/patientsApi";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { getTaskResults } from "../api/tasksApi";

function PatientProfile() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [isLargerThan992] = useMediaQuery("(min-width: 768px)");

  
  const {
    isLoading,
    isSuccess,
    error,
    data: patientData,
  } = useQuery("patient", () => getPatient({ auth, id: id ?? "" }));
  const patient = isSuccess ? patientData.data : undefined;
  
  /*
  TODO s peťom prebrať či robiť prienik na front-end alebo back-end
  const {
    isLoading: isLoadingResults,
    isSuccess: resultsIsSuccess,
    error: resultsError,
    data: taskResultsData,
  } = useQuery("results", () => getTaskResults({ auth }));

  

  let finishedTaskIds: string[] = [];
  if (resultsIsSuccess && patient !== undefined) {
    finishedTaskIds = patient.assigned_tasks.map((task) => task.id);
    //imageData.filter((image) => intersection(image.tags.map((tag) => tag.name), selectedTags).length !== 0);
  }
  */
  

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (patient === undefined || error !== null) {
    return <Text>This patient does not exist or there was an error</Text>;
  }

  return (
    <Container centerContent>
      <Flex gap="6" flexDirection={isLargerThan992 ? "row" : "column"}>
        <Box maxW="30rem">
          <PatientCard
            name={patient.name}
            avatarUrl="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
          />

          <Box mb="5">
            <Heading>Diagnosis</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Text>
          </Box>
          <div>
            <Heading>Exercises</Heading>
            <PatientExercises assignedTasks={patient.assigned_tasks} />
          </div>
        </Box>
        <Box>
          <Box>
            <Link as={RouterLink} to="/Exercises">
              <Button mr="1">Asign new exercise</Button>
            </Link>
          </Box>
          <div>
            <Heading>Notes</Heading>
            <Textarea rows={10} overflow="hidden" value={"Some notes"} />
          </div>
        </Box>
      </Flex>
      <Box>
        <Heading>Meetings</Heading>
      </Box>
    </Container>
  );
}

export default PatientProfile;
