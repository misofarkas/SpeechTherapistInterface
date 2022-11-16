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
import UnlinkPatientModal from "../components/UnlinkPatientModal";

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (patient === undefined || error !== null) {
    return <Text>This patient does not exist or there was an error</Text>;
  }

  return (
    <Container centerContent>
      <Flex gap="4rem" flexDirection={isLargerThan992 ? "row" : "column"}>
        <Box maxW="30rem">
          <PatientCard name={patient.name} avatarUrl={patient.image} />

          <Box mb="5">
            <Heading>Diagnosis</Heading>
            <Textarea rows={10} overflow="hidden" />
            <Button>save diagnosis</Button>
          </Box>
          <div>
            <Heading>Exercises</Heading>
            <PatientExercises assignedTasks={patient.assigned_tasks} />
          </div>
        </Box>
        <Box minW="400px">
          <Box>
            <Link as={RouterLink} to="/Exercises">
              <Button mr="1">Asign new exercise</Button>
            </Link>
            <UnlinkPatientModal patientName={patient.name} patientId={patient.id} />
          </Box>
          <div>
            <Heading>Notes</Heading>
            <Textarea rows={10} overflow="hidden" value={"Some notes"} />
          </div>
        </Box>
      </Flex>
    </Container>
  );
}

export default PatientProfile;
