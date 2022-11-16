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
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import QuestionList from "../components/QuestionList";
import { Patient, TaskExtended } from "../types/commonTypes";
import { useAuth } from "../contexts/AuthContext";
import { getTask } from "../api/tasksApi";
import { getPatients } from "../api/patientsApi";
import { assignTask } from "../api/tasksApi";
import { deleteTask } from "../api/tasksApi";
import { useQuery, useMutation } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { getImages } from "../api/imageApi";

function ExercisePreview() {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const { auth, user } = useAuth();
  const { isOpen: isAssignOpen, onOpen: onAssignOpen, onClose: onAssignClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedPatient, setSelectedPatient] = useState("");
  //const [isDeleting, setIsDeleting] = useState(false);

  const { isLoading, isSuccess, error, data: taskData } = useQuery("task", () => getTask({ auth, id: id ?? "", type: type ?? ""}));
  const {
    isLoading: isLoadingImages,
    error: imageError,
    data: imageData,
  } = useQuery("images", () => getImages({ auth }));

  let task: TaskExtended | undefined = undefined;
  if (isSuccess) {
    task = taskData.data as TaskExtended;
  }
  const isEditable = task?.created_by === user.id;

  const {
    isLoading: isLoadingPatients,
    isSuccess: isSuccessPatients,
    error: errorPatients,
    data: patientsData,
  } = useQuery("patients", () => getPatients({ auth }));

  let patients: Patient[] = [];
  if (isSuccessPatients) {
    patients = patientsData.data;
  }

  const { isLoading: isAssigning, mutate: assignTaskMutation } = useMutation(() =>
    assignTask({ auth, patientId: selectedPatient, taskId: task?.id ?? "" })
  );

  const { isLoading: isDeleting, mutate: deleteTaskMutation } = useMutation(
    () => deleteTask({ auth, id: task?.id ?? "" }),
    {
      onSuccess: () => {
        navigate("/Exercises");
      },
    }
  );

  //console.log("created_by:", task?.created_by);
  //console.log("user id: ", user.id);

  if (error !== null || errorPatients !== null || task === undefined || task.questions.length === 0) {
    console.log("error:", error);
    return (
      <Center mt="10">
        <Heading fontSize={"4xl"}>Task not found</Heading>
      </Center>
    );
  }

  if (isLoading || isLoadingPatients || isLoadingImages || !imageData) {
    return <LoadingSpinner />;
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
                  return (
                    <option key={patient.id} value={patient.email}>
                      {patient.name}
                    </option>
                  );
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
                  assignTaskMutation();
                }}
              >
                Assign
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {isEditable && (
          <Button isLoading={isDeleting} loadingText="Deleting..." maxW="200px" onClick={onDeleteOpen}>
            Delete task
          </Button>
        )}

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
                  deleteTaskMutation();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>

      <QuestionList questions={task.questions} type={task.type} difficulty={task.difficulty} imageData={imageData.data}/>
    </Container>
  );
}

export default ExercisePreview;
