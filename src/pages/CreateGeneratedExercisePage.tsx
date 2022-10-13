import { useState, useRef } from "react";
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
import { TagProvider } from "../contexts/TagContext";
import axios from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import { Question } from "../types/commonTypes"
import SelectTags from "../components/SelectTags";
import QuestionList from "../components/QuestionList";

function CreateGeneratedExercisePage() {
  const TASK_URL = "/task/tasks/";
  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  const { auth } = useAuth();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const returnRef = useRef<HTMLButtonElement>(null);
  const generatedQuestionsReady = questions !== undefined && questions.length !== 0;

  const difficulty = "easy";

  async function handleTaskGeneration() {
    setIsGenerating(true);
    try {
      const questionData = await axios.post(
        TASK_URL,
        {
          name: name,
          type: type,
          difficulty: difficulty,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${auth?.accessToken}`,
          },
          withCredentials: false,
        }
      );

      setQuestions(questionData.data.questions);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => setIsGenerating(false), 1000);

  }

  return (
    <TagProvider>
      <Container>
        {isGenerating ? (
          <Center mt="20%">
            <Spinner mr="10" size="xl" />
            <Text fontSize="24px">Generating ...</Text>
          </Center>
        ) : (
          <>
            {!generatedQuestionsReady ? (
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
                            handleTaskGeneration();
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
            ) : (
              <QuestionList questions={questions} type={type} difficulty={difficulty} />
            )}
          </>
        )}
      </Container>
    </TagProvider>
  );
}

export default CreateGeneratedExercisePage;
