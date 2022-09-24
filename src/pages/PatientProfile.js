import React from "react";
import { useParams } from "react-router-dom";
import { PatientData } from "../data/PatientData.js";
import {
  Button,
  Container,
  Textarea,
  Text,
  Heading,
  Flex,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import PatientExercises from "../components/PatientExercises.js";
import PatientCard from "../components/PatientCard.js";

function PatientProfile() {
  const { id } = useParams();
  const person = fetchPerson(id);

  const [isLargerThan992] = useMediaQuery("(min-width: 768px)");

  return (
    <Container centerContent>
      <Flex gap="6" flexDirection={isLargerThan992 ? "row" : "column"}>
        <Box maxW="30rem">
          <PatientCard
            name={person.name}
            avatarUrl="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
          />

          <Box mb="5">
            <Heading>Diagnosis</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Box>
          <div>
            <Heading>Exercises</Heading>
            <PatientExercises patientId={id} />
          </div>
        </Box>
        <Box>
          <Box>
            <Button mr="1">Asign new exercise</Button>
            <Button>Send notification</Button>
          </Box>
          <div>
            <Heading>Notes</Heading>
            <Textarea rows="10" overflow="hidden">
              27.11.2021 Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </Textarea>
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

function fetchPerson(id) {
  const patients = PatientData.filter((p) => p.id === Number(id));
  if (patients.length === 0) {
    return null;
  }

  return patients[0];
}
