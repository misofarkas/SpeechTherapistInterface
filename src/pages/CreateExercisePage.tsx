import { useState, useEffect } from "react";
import QuestionList from "../components/QuestionList";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Select,
  Text,
  Button,
  Input,
  Stack,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Toast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";
import {
  Question,
  FourChoicesChoice,
  CustomChoice,
  FourChoicesQuestion,
  ConnectPairCustomQuestion,
  Task,
} from "../types/commonTypes";
import {
  isFourChoiceChoice,
  isCustomChoice,
  isFourChoiceQuestion,
  isCustomQuestion,
  isFourChoiceQuestions,
  isCustomQuestions,
} from "../types/typeGuards";
import { TaskType, Difficulties } from "../types/enums";
import UploadImageChoice from "../components/UploadImageChoice";
import { postTask } from "../api/tasksApi";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { getImages } from "../api/imageApi";
import { useQuery, useMutation } from "react-query";

function CreateExercisePage() {
  const { auth } = useAuth();
  const [name, setName] = useState("");
  const [type, setType] = useState<TaskType>(TaskType.ConnectPairsTextImage);
  const [savedType, setSavedType] = useState<TaskType>(TaskType.ConnectPairsTextImage);
  const difficulty = Difficulties.Hard;
  const [questions, setQuestions] = useState<FourChoicesQuestion[] | ConnectPairCustomQuestion[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");

  console.log("selectedType:", type, type === TaskType.ConnectPairsTextImage);
  const {
    isLoading: isLoadingImages,
    error: imageError,
    data: imageData,
  } = useQuery("images", () => getImages({ auth }));
  const {
    isLoading: isSubmitting,
    error: postingError,
    mutate: postTaskMutation,
  } = useMutation(() => postTask({ auth, name, type: savedType, tags: [], questions }));

  function handleAddQuestion(questions: FourChoicesQuestion[] | ConnectPairCustomQuestion[]) {
    if (savedType === TaskType.FourChoicesImage && isFourChoiceQuestions(questions, savedType)) {
      setQuestions([
        ...questions,
        {
          id: uuidv4(),
          heading: "placeholder",
          choices: [{ id: uuidv4(), question_data: "", correct_option: "", incorrect_option1: "", incorrect_option2: "", incorrect_option3: "" }],
        },
      ]);
    }
    if (
      (savedType === TaskType.ConnectPairsTextText || savedType === TaskType.ConnectPairsTextImage) &&
      isCustomQuestions(questions, savedType)
    ) {
      setQuestions([
        ...questions,
        {
          id: uuidv4(),
          heading: "placeholder",
          choices: [
            { id: uuidv4(), data1: "", data2: "", tags: [] },
            { id: uuidv4(), data1: "", data2: "", tags: [] },
            { id: uuidv4(), data1: "", data2: "", tags: [] },
          ],
        },
      ]);
    }
  }

  function handleDeleteQuestion(questionId: string) {
    if (isFourChoiceQuestions(questions, savedType)) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
    if (isCustomQuestions(questions, savedType)) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  }

  function handlePostTask(questions: Question[]) {
    console.log("questions", questions);
    console.log("length", questions.length);
    if (questions.length === 0) {
      return;
    }

    let isValid = true;
    setError("");

    if (questions === undefined || questions.length === 0) {
      isValid = false;
    }
    questions.forEach((question) => {
      question.choices.forEach((choice) => {
        if (
          (isFourChoiceChoice(choice, savedType) &&
            !choice.question_data &&
            !choice.correct_option &&
            !choice.incorrect_option1 &&
            !choice.incorrect_option2 &&
            !choice.incorrect_option3) ||
          (isCustomChoice(choice, savedType) && !choice.data1 && !choice.data2)
        ) {
          isValid = false;
        }
      });
    });

    console.log("valid?", isValid);

    if (isValid) {
      postTaskMutation();
    } else {
      setError("not all question are fully filled out");
    }
  }

  function handleUpdateChoice(questionId: string, choiceId: string, input: string, index: number) {
    let newQuestions = cloneDeep(questions);
    let question = isFourChoiceQuestions(newQuestions, type)
      ? newQuestions.find((q) => q.id === questionId)
      : newQuestions.find((q) => q.id === questionId);

    if (!question) {
      // couldn't find question
      return;
    }

    let choice = isFourChoiceQuestion(question, savedType)
      ? question.choices.find((c) => c.id === choiceId)
      : question.choices.find((c) => c.id === choiceId);
    if (choice && isFourChoiceChoice(choice, savedType)) {
      switch (index) {
        case 0:
          choice.question_data = input;
          break;
        case 1:
          choice.correct_option = input;
          break;
        case 2:
          choice.incorrect_option1 = input;
          break;
        case 3:
          choice.incorrect_option2 = input;
          break;
        case 4:
          choice.incorrect_option3 = input;
          break;
      }
    }
    if (choice && isCustomChoice(choice, savedType)) {
      index === 0 ? (choice.data1 = input) : (choice.data2 = input);
    }

    setQuestions(newQuestions);
  }

  return (
    <Container>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Settings</Tab>
          <Tab>Questions</Tab>
          <Tab>Upload Custom Image</Tab>
          <Tab>Finalize</Tab>
        </TabList>

        <TabPanels>
          {/* Settings tab */}
          <TabPanel>
            <Stack maxW="400px" spacing="0.5rem">
              <Text>Name</Text>
              <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
              <Text>Type</Text>
              <Select value={type} onChange={(e) => setType(e.target.value as TaskType)}>
                <option value={TaskType.ConnectPairsTextImage}>Connect Pairs (Text - Image)</option>
                <option value={TaskType.ConnectPairsTextText}>Connect Pairs (Text - Text)</option>
                <option value={TaskType.FourChoicesImage}>Name Images</option>
              </Select>
              <Text>Difficulty</Text>
              <Select>
                <option value="easy">Easy</option>
                <option value="hard">Hard</option>
              </Select>
              <Button
                onClick={
                  type !== savedType && questions.length !== 0
                    ? onOpen
                    : () => {
                        setSavedType(type);
                      }
                }
              >
                Apply
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Warning!</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>Changing Task type will delete all created questions</Text>
                    <Text mb="4">Do you want to proceed?</Text>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => {
                        setSavedType(type);
                        setQuestions([]);
                        onClose();
                      }}
                    >
                      Continue
                    </Button>
                    <Button colorScheme="red" onClick={onClose}>
                      Abort
                    </Button>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Stack>
          </TabPanel>

          {/* Question tab */}
          <TabPanel>
            {isLoadingImages || imageData === undefined ? (
              <Text>loading..</Text>
            ) : (
              <>
                <QuestionList
                  questions={questions}
                  type={savedType}
                  difficulty={difficulty}
                  handleUpdateChoice={handleUpdateChoice}
                  handleDeleteQuestion={handleDeleteQuestion}
                  imageData={imageData.data}
                />
                <Box
                  w="full"
                  h="5rem"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="md"
                  textAlign="center"
                  cursor="pointer"
                  onClick={() => handleAddQuestion(questions)}
                >
                  <AddIcon color="gray.300" mt="5" w={8} h={8} />
                </Box>
              </>
            )}
          </TabPanel>

          <TabPanel>
            <UploadImageChoice />
          </TabPanel>
          {/* Finalize tab */}
          <TabPanel>
            <Button
              isLoading={isSubmitting}
              loadingText={"sumbitting"}
              onClick={() => {
                handlePostTask(questions);
              }}
            >
              Save
            </Button>
            {error && <Text color="red.400">{error}</Text>}
            {postingError !== null && <Text color="red.400">failed to save task</Text>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default CreateExercisePage;
