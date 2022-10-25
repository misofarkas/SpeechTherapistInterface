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

function CreateGeneratedExercisePage() {
  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  const { selectedTags } = useTagContext();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const returnRef = useRef<HTMLButtonElement>(null);
  const difficulty = "easy";

  const {
    mutate: generateTaskMutation,
    isLoading: isGenerating,
    data: generatedTask,
  } = useMutation(() => generateTask({ auth, name, type, difficulty, selectedTags }));

  if (generatedTask !== undefined) {
    navigate(`/ExercisePreview/${generatedTask.data.id}`);
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
            <Text>Name</Text>
            <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
            <Text>Type</Text>
            <Select value={type} onChange={(e) => setType(Number(e.target.value))}>
              <option value={1}>Connect Pairs (Text - Image)</option>
              <option value={2}>Name Images</option>
            </Select>
            <SelectTags withFilter={true} />

            <Button onClick={onOpen}>Generate</Button>
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
