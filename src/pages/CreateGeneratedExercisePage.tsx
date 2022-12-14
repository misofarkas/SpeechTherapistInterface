import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Select,
  Text,
  Button,
  Input,
  Stack,
  Center,
  Spinner,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useTagContext } from "../contexts/TagContext";
import { useAuth } from "../contexts/AuthContext";
import SelectTags from "../components/SelectTags";
import { generateTask } from "../api/tasksApi";
import { useMutation } from "react-query";
import { Difficulties, TaskType } from "../types/enums";
import { taskTypeName } from "../common/typeNameConversion";

function CreateGeneratedExercisePage() {
  const [name, setName] = useState("");
  const [type, setType] = useState<TaskType>(TaskType.ConnectPairsTextImage);
  const { selectedTags } = useTagContext();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const returnRef = useRef<HTMLButtonElement>(null);
  const difficulty = Difficulties.Easy;

  // Mutation used for generating exercises
  const {
    mutate: generateTaskMutation,
    isLoading: isGenerating,
    data: generatedTask,
  } = useMutation(() => generateTask({ auth, name, type, difficulty, selectedTags }));

  // Redirect the user to the generated exercise preview after it has finished generating
  if (generatedTask !== undefined) {
    navigate(`/ExercisePreview/${generatedTask.data.type}/${generatedTask.data.id}`);
  }

  return (
    <Container>
      {isGenerating ? (
        <Center mt="20%">
          <Spinner mr="10" size="xl" />
          <Text fontSize="24px">Generating ...</Text>
        </Center>
      ) : (
        <>
          <Stack minW="300px" maxW="600px" mx="auto" spacing="0.5rem">
            {/* Task name */}
            <Text>Name</Text>
            <Input value={name} onChange={(e) => setName(e.target.value)}></Input>

            {/* Task type */}
            <Text>Type</Text>
            <Select value={type} onChange={(e) => setType(e.target.value as TaskType)}>
              <option value={TaskType.ConnectPairsTextImage}>{taskTypeName({taskType: TaskType.ConnectPairsTextImage})}</option>
              <option value={TaskType.FourChoicesImage}>{taskTypeName({taskType: TaskType.FourChoicesImage})}</option>
              <option value={TaskType.FourChoicesText}>{taskTypeName({taskType: TaskType.FourChoicesText})}</option>
            </Select>

            {/* Task tags with filter */}
            <SelectTags withFilter={true} />

            <Button onClick={onOpen}>Generate</Button>

            {/* Alert dialog confirming the user's actions */}
            <AlertDialog isOpen={isOpen} leastDestructiveRef={returnRef} onClose={onClose}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Generate Task
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    You cannot change task type and selected tags later. Do you want to proceed?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={returnRef} onClick={onClose}>
                      Return
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        onClose();
                        generateTaskMutation();
                      }}
                      ml={3}
                    >
                      Proceed
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Stack>
        </>
      )}
    </Container>
  );
}

export default CreateGeneratedExercisePage;
