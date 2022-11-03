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
import { Question, BasicChoice, CustomChoice, BasicQuestion, ConnectPairCustomQuestion } from "../types/commonTypes";
import {
  isBasicChoice,
  isCustomChoice,
  isBasicQuestion,
  isCustomQuestion,
  isBasicQuestions,
  isCustomQuestions,
} from "../types/typeGuards";
import UploadImageChoice from "../components/UploadImageChoice";
import { postTask } from "../api/tasksApi";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { getImages } from "../api/imageApi";
import { useQuery, useMutation } from "react-query";

function CreateExercisePage() {
  const { auth } = useAuth();
  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  const [savedType, setSavedType] = useState(1);
  const difficulty = "hard";
  const [questions, setQuestions] = useState<BasicQuestion[] | ConnectPairCustomQuestion[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");

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

  function handleAddQuestion(questions: BasicQuestion[] | ConnectPairCustomQuestion[]) {
    if (savedType === 3 && isBasicQuestions(questions, savedType)) {
      setQuestions([
        ...questions,
        {
          id: uuidv4(),
          heading: "placeholder",
          choices: [
            { id: uuidv4(), text: "", image: "", tags: [] },
            { id: uuidv4(), text: "", image: "", tags: [] },
            { id: uuidv4(), text: "", image: "", tags: [] },
            { id: uuidv4(), text: "", image: "", tags: [] },
          ],
        },
      ]);
    }
    if ((savedType === 1 || savedType === 2) && isCustomQuestions(questions, savedType)) {
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
    if (isBasicQuestions(questions, savedType)) {
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
          (isBasicChoice(choice, savedType) && !choice.text && !choice.image) ||
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

  function handleUpdateChoice(questionId: string, choiceId: string, input: string, changeFirst: boolean) {
    let newQuestions = cloneDeep(questions);
    let question = isBasicQuestions(newQuestions, type)
      ? newQuestions.find((q) => q.id === questionId)
      : newQuestions.find((q) => q.id === questionId);

    if (!question) {
      // couldn't find question
      return;
    }

    let choice = isBasicQuestion(question, savedType)
      ? question.choices.find((c) => c.id === choiceId)
      : question.choices.find((c) => c.id === choiceId);
    if (choice && isBasicChoice(choice, savedType)) {
      changeFirst ? (choice.text = input) : (choice.image = input);
    }
    if (choice && isCustomChoice(choice, savedType)) {
      changeFirst ? (choice.data1 = input) : (choice.data2 = input);
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
              <Select value={type} onChange={(e) => setType(Number(e.target.value))}>
                <option value={1}>Connect Pairs (Text - Image)</option>
                <option value={2}>Connect Pairs (Text - Text)</option>
                <option value={3}>Name Images</option>
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
