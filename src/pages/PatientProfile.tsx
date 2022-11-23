import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  Container,
  Textarea,
  Text,
  Heading,
  Flex,
  Box,
  Link,
  useMediaQuery,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import PatientExercises from "../components/PatientExercises";
import PatientCard from "../components/PatientCard";
import { useAuth } from "../contexts/AuthContext";
import { getPatient, postNotes } from "../api/patientsApi";
import { Link as RouterLink } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { getTaskResults } from "../api/tasksApi";
import UnlinkPatientModal from "../components/UnlinkPatientModal";
import { Patient } from "../types/commonTypes";
import { TaskResult } from "../types/taskResultTypes";
import { getMeetings } from "../api/meetingsApi";
import { Meeting } from "../types/meetingTypes";
import MeetingCard from "../components/MeetingCard";

function PatientProfile() {
  const { id } = useParams();
  const { auth, user } = useAuth();
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [taskResults, setTaskResults] = useState<TaskResult[]>([]);

  const { isLoading, error } = useQuery("patient", () => getPatient({ auth, id: id ?? "" }), {
    onSuccess: (res) => {
      setPatient(res.data);
    },
  });

  const { isLoading: isLoadingMeetings, isError } = useQuery("meetings", () => getMeetings({ auth }), {
    enabled: !!patient,
    onSuccess: (res) => {
      setMeetings(
        res.data.filter((meeting) => meeting.created_by === user.id && meeting.assigned_patient === patient!.email)
      );
    },
  });

  const { isLoading: isSavingNotes, mutate: notesMutation } = useMutation(postNotes);

  const { isLoading: isLoadingResults, error: resultsError } = useQuery("results", () => getTaskResults({ auth }), {
    enabled: !!patient,
    onSuccess: (res) => {
      console.log("res", res);
      if (patient) {
        setTaskResults(res.data.filter((result) => result.answered_by === patient.id));
      }
    },
  });

  if (isLoading || isLoadingMeetings || isLoadingResults) {
    return <LoadingSpinner />;
  }

  if (patient === undefined || error !== null) {
    return <Text>This patient does not exist or there was an error</Text>;
  }

  return (
    <Container centerContent>
      <Flex gap={isLargerThan1280 ? "4rem" : "0rem"} flexDirection={isLargerThan1280 ? "row" : "column"}>
        <Box minW="30rem">
          <PatientCard>
            <Flex>
              <Avatar src={patient.image} m="2" />
              <Box>
                <Heading>Patient</Heading>
                <Heading>{patient.name}</Heading>
                <Text>email: {patient.email}</Text>
              </Box>
            </Flex>
          </PatientCard>
          <PatientCard>
            <Stack>
              <Heading>Diagnosis</Heading>
              <Textarea rows={5} overflow="hidden" placeholder="Patient's diagnosis goes here" />
              <Button>Save diagnosis</Button>
            </Stack>
          </PatientCard>
          <PatientCard>
            <Stack>
              <Heading>Notes</Heading>
              <Textarea
                rows={8}
                placeholder="Make notes about patient's progress"
                value={patient.notes}
                onChange={(e) => setPatient({ ...patient, notes: e.target.value })}
              />
              <Button
                isLoading={isSavingNotes}
                onClick={() => notesMutation({ auth, notes: patient.notes, id: patient.id })}
              >
                Save notes
              </Button>
            </Stack>
          </PatientCard>
          <PatientCard>
            <Stack>
              <Heading>Meetings</Heading>
              {meetings.map((meeting) => {
                return <MeetingCard key={meeting.id} meeting={meeting} displayName={false}/>;
              })}
            </Stack>
          </PatientCard>
        </Box>
        <Box minW="30rem">
          <PatientCard>
            <Link as={RouterLink} to="/Exercises">
              <Button mr="1" w="11rem">
                Asign new exercise
              </Button>
            </Link>
            <UnlinkPatientModal patientName={patient.name} patientId={patient.id} />
          </PatientCard>
          <PatientCard>
            <Stack>
              <Heading>Assigned exercises</Heading>
              <PatientExercises assignedTasks={patient.assigned_tasks} patientTaskResults={taskResults} />
            </Stack>
          </PatientCard>
        </Box>
      </Flex>
    </Container>
  );
}

export default PatientProfile;
