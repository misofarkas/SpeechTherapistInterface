import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { getMeetings } from "../api/meetingsApi";
import MeetingCard from "../components/MeetingCard";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "react-query";
import { Meeting } from "../types/meetingTypes";
import { useState } from "react";
import { getWeek, getYear } from "date-fns";
import { getPatients } from "../api/patientsApi";
import { TaskResult } from "../types/taskResultTypes";
import { getTaskResults } from "../api/tasksApi";
import { intersection } from "lodash";
import { dateIsToday } from "../common/dateUtils";
import { Task } from "../types/taskTypes";
import PatientExercises from "../components/patientComponents/PatientExercises";
import LoadingSpinner from "../components/LoadingSpinner";

function Dashboard() {
  const { auth, user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isLoading, isError } = useQuery("meetings", () => getMeetings({ auth }), {
    onSuccess: (res) => {
      setMeetings(res.data.filter((meeting) => meeting.created_by === user.id && dateIsToday(meeting.start_time)));
    },
  });

  const { isLoading: isLoadingPatients, data: patientData } = useQuery("patients", () => getPatients({ auth }));
  const { isLoading: isLoadingResults, data: taskResultsData } = useQuery(
    "taskResults",
    () => getTaskResults({ auth }),
    {
      enabled: !!patientData,
      onSuccess: (res) => {
        const taskResultsToday: Task[] = [];
        const filteredResults = res.data.filter((result) => dateIsToday(result.date_created));
        patientData?.data.map((patient) => {
          const filteredTasks = patient.assigned_tasks.filter((task) =>
            filteredResults
              .filter((result) => result.answered_by === patient.id)
              .map((result) => result.task)
              .includes(task.id)
          );
          taskResultsToday.push(...filteredTasks);
        });

        setTasks(taskResultsToday);
      },
    }
  );

  if (isLoading || isLoadingPatients || isLoadingResults || !patientData || !taskResultsData) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Heading size="2xl" mb="10">
        Dashboard
      </Heading>
      <Flex gap="4">
        <Box minW="25rem" borderWidth="1px" borderRadius="2xl" p="5">
          <Heading mb="4">Today's meetings</Heading>
          {meetings.length !== 0 ? (
            meetings.map((meeting) => {
              return <MeetingCard key={meeting.id} meeting={meeting} displayName={true} />;
            })
          ) : (
            <Text>You do not have any scheduled meetings</Text>
          )}
        </Box>
        <Box minW="25rem" borderWidth="1px" borderRadius="2xl" p="5">
          <Heading mb="4">Today's patient activity</Heading>
          {tasks.length !== 0 ? (
            PatientExercises({ assignedTasks: tasks, patientTaskResults: taskResultsData.data })
          ) : (
            <Text>No patient has finished any exercise</Text>
          )}
        </Box>
      </Flex>
    </Container>
  );
}

export default Dashboard;
