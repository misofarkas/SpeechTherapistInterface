import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { getMeetings } from "../api/meetingsApi";
import MeetingCard from "../components/MeetingCard";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "react-query";
import { Meeting } from "../types/meetingTypes";
import { useState } from "react";
import PatientCard from "../components/PatientCard";

function Dashboard() {
  const { auth, user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { isLoading, isError } = useQuery("meetings", () => getMeetings({ auth }), {
    onSuccess: (res) => {
      setMeetings(
        res.data.filter(
          (meeting) =>
            meeting.created_by === user.id &&
            new Date(meeting.start_time) < new Date() &&
            new Date(meeting.end_time) > new Date()
        )
      );
    },
  });

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
          <Text>No patient has finished any exercise</Text>
        </Box>
      </Flex>
    </Container>
  );
}

export default Dashboard;
