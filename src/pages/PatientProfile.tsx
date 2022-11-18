import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container, Textarea, Text, Heading, Flex, Box, Link, useMediaQuery } from "@chakra-ui/react";
import PatientExercises from "../components/PatientExercises";
import PatientCard from "../components/PatientCard";
import { useAuth } from "../contexts/AuthContext";
import { getPatient, postNotes } from "../api/patientsApi";
import { Link as RouterLink } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { getTaskResults } from "../api/tasksApi";
import UnlinkPatientModal from "../components/UnlinkPatientModal";
import { Patient, TaskResult } from "../types/commonTypes";
import { intersection } from "lodash";

function PatientProfile() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [isLargerThan992] = useMediaQuery("(min-width: 768px)");
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [taskResults, setTaskResults] = useState<TaskResult[]>([]);
  const { isLoading, isSuccess, error } = useQuery("patient", () => getPatient({ auth, id: id ?? "" }), {
    onSuccess: (res) => {
      setPatient(res.data);
    },
  });

  const { isLoading: isSavingNotes, mutate: notesMutation } = useMutation(postNotes);

  const {
    isLoading: isLoadingResults,
    isSuccess: resultsIsSuccess,
    error: resultsError,
  } = useQuery("results", () => getTaskResults({ auth }), {
    enabled: !!patient,
    onSuccess: (res) => {
      if (patient) {
        setTaskResults(
          res.data.filter((result) => result.answered_by === patient.id)
        );
      }
    },
  });

  console.log("finishedTasksIds", taskResults);
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
            <Button>Save diagnosis</Button>
          </Box>
          <Box>
            <Heading>Assigned exercises</Heading>
            <PatientExercises assignedTasks={patient.assigned_tasks} patientTaskResults={taskResults} />
          </Box>
        </Box>
        <Box minW="400px">
          <Box>
            <Link as={RouterLink} to="/Exercises">
              <Button mr="1">Asign new exercise</Button>
            </Link>
            <UnlinkPatientModal patientName={patient.name} patientId={patient.id} />
          </Box>
          <Box>
            <Heading>Notes</Heading>
            <Textarea
              rows={10}
              overflow="hidden"
              value={patient.notes}
              onChange={(e) => setPatient({ ...patient, notes: e.target.value })}
            />
            <Button
              isLoading={isSavingNotes}
              onClick={() => notesMutation({ auth, notes: patient.notes, id: patient.id })}
            >
              Save notes
            </Button>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}

export default PatientProfile;
