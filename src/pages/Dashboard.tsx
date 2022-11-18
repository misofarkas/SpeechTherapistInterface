import { Container, Heading } from "@chakra-ui/react";
import { getMeetings } from "../api/meetingsApi";
import MeetingCard from "../components/MeetingCard";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "react-query";
import { Meeting } from "../types/commonTypes";
import { useState } from "react";

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
      <Heading size="2xl" mb="10">Dashboard</Heading>
      <Heading mb="4">Today's meetings</Heading>
      {meetings.map((meeting) => {
        return <MeetingCard meeting={meeting} />;
      })}
    </Container>
  );
}

export default Dashboard;
