import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Flex,
  Tag,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import QuestionList from "../components/QuestionList";
import { Patient, TaskExtended } from "../types/commonTypes";
import { useAuth } from "../contexts/AuthContext";
import getTasks from "../api/getTasks";
import getPatients from "../api/getPatients";
import assignTask from "../api/assignTask";
import deleteTask from "../api/deleteTask";

function ExercisePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskExtended>();
  const [error, setError] = useState("");
  const { auth, userId } = useAuth();
  const { isOpen: isAssignOpen, onOpen: onAssignOpen, onClose: onAssignClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [patients, setPatients] = useState<Patient[]>();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isEditable = task?.created_by === userId.id;
  console.log("deleting:", isDeleting)

  useEffect(() => {
    if (id !== undefined) {
      getTasks({ auth, setError, id }).then((value) => {
        setTask(value);
      });

      getPatients({ auth, setError }).then((value) => {
        setPatients(value);
      });
    }
  }, []);

  function handleTaskAssignment(patientId: string, taskId: string) {
    assignTask({ auth, setError, patientId, taskId });
  }

  function handleTaskDeletion(id: string) {
    setIsDeleting(true);
    deleteTask({ auth, setError, id});
    if (error === "") {
      setTimeout(() => navigate('/Exercises'), 1000)
      
    }
  }

  if (error !== "") {
    return (
      <>
        <Text>There has been an error</Text>
        <Text>{error}</Text>
      </>
    );
  }

  if (task === undefined) {
    return (
      <>Loading...</>
    )
  }

  return (
    <Container maxW="1000px">
      <Stack mb="2">
        <Flex gap="2">
          <Heading>{task.name}</Heading>
          <Tag>Favorited: {15}</Tag>
        </Flex>
        <Text>Created by: {task.created_by}</Text>
        <Text>Difficulty: {task.difficulty}</Text>
        <Button maxW="200px" onClick={onAssignOpen}>
          Assign to patient
        </Button>

        <Modal isOpen={isAssignOpen} onClose={onAssignClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Assing exercise</ModalHeader>
            <ModalBody>
              <Select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                placeholder="Select patient"
              >
                {patients?.map((patient) => {
                  return <option value={patient.email}>{patient.name}</option>;
                })}
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onAssignClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  onAssignClose();
                  handleTaskAssignment(selectedPatient, task.id);
                }}
              >
                Assign
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {isEditable && <Button isLoading={isDeleting} loadingText="Deleting..." maxW="200px" onClick={onDeleteOpen}>Delete task</Button>}

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete exercise</ModalHeader>
            <ModalBody>
              <Text>Are you sure you want to delete task {task.name}?</Text>
              <Text>This action cannot be undone</Text>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onDeleteClose();
                  handleTaskDeletion(task.id);
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>

      <QuestionList questions={task.questions} type={task.type} difficulty={task.difficulty} />
    </Container>
  );
}

export default ExercisePreview;
