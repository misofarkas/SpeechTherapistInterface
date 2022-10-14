import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { PatientData } from "../data/PatientData";
import { Button, Container, Textarea, Text, Heading, Flex, Box, useMediaQuery } from "@chakra-ui/react";
import PatientExercises from "../components/PatientExercises";
import PatientCard from "../components/PatientCard";
import { useAuth } from "../contexts/AuthContext";
import { Patient } from "../types/commonTypes";
import getPatients from "../api/getPatients";

function PatientProfile() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const { auth } = useAuth();
  const [error, setError] = useState("");

  const [isLargerThan992] = useMediaQuery("(min-width: 768px)");


  useEffect(() => {
    getPatients({ auth, setError, id }).then((value) => {
      setPatient(value);
    });
  }, []);


  return (
    <Container centerContent>
      {patient === undefined ? (
        <Text>This patient does not exist</Text>
      ) : (
        <>
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
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </Text>
              </Box>
              <div>
                <Heading>Exercises</Heading>
                <PatientExercises patientId={id ?? ""} />
              </div>
            </Box>
            <Box>
              <Box>
                <Button mr="1">Asign new exercise</Button>
                <Button>Send notification</Button>
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
        </>
      )}
    </Container>
  );
}

export default PatientProfile;

