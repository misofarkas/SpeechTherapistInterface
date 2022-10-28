import { Container, Heading } from "@chakra-ui/react";
import MeetingCard from "../components/meetingCard";

function Dashboard() {
  return (
    <Container>
      <Heading>Dashboard</Heading>
      <Heading>Upcomming meetings</Heading>
      <MeetingCard/>
      <MeetingCard/>
      <MeetingCard/>
    </Container>
  );
}

export default Dashboard;
