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
import { Question, BasicChoice, CustomChoice } from "../types/commonTypes";
import UploadImage from "../components/UploadImage";
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
  const [questions, setQuestions] = useState<Question[]>([]);
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

  function handleAddQuestion(heading: string) {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        heading: heading,
        choices: generateEmptyChoices(),
      },
    ]);
  }

  function handleDeleteQuestion(questionId: string) {
    const newQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(newQuestions);
  }

  function handlePostTask() {
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
        if (choice.text === "" && choice.image === "") {
          isValid = false;
        }
      });
    });

    if (isValid) {
      postTaskMutation();
    } else {
      setError("not all question are fully filled out");
    }
  }

  function generateEmptyChoices() {
    switch (savedType) {
      case 1:
      case 2:
        // Connect Pairs
        return [
          { id: uuidv4(), text: "", image: "", tags: [] },
          { id: uuidv4(), text: "", image: "", tags: [] },
          { id: uuidv4(), text: "", image: "", tags: [] },
          { id: uuidv4(), text: "", image: "", tags: [] },
          { id: uuidv4(), text: "", image: "", tags: [] },
          { id: uuidv4(), text: "", image: "", tags: [] },
        ];

      case 3:
        return [
          { id: uuidv4(), text: "", image: "", tags: [] },
          { id: uuidv4(), text: "", image: "", tags: [] },
          { id: uuidv4(), text: "", image: "", tags: [] },
          { id: uuidv4(), text: "", image: "", tags: [] },
          { id: uuidv4(), text: "", image: "", tags: [] },
        ];

      default:
        return [];
    }
  }

  console.log("quesitons:", questions);

  function handleUpdateChoice(
    questionId: string,
    choiceId: string,
    text: string | undefined,
    image: string | undefined
  ) {
    let newQuestions = cloneDeep(questions);
    let question = newQuestions.find((q) => q.id === questionId);
    let choice = question?.choices.find((c) => c.id === choiceId);
    if (choice !== undefined) {
      if (text !== undefined) {
        choice.text = text;
      }
      if (image !== undefined) {
        choice.image = image;
      }
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
                  onClick={() => handleAddQuestion("placeholder")}
                >
                  <AddIcon color="gray.300" mt="5" w={8} h={8} />
                </Box>
              </>
            )}
          </TabPanel>

          {/* Help tab */}
          <TabPanel>
            <UploadImage />
          </TabPanel>
          <TabPanel>
            <Button isLoading={isSubmitting} loadingText={"sumbitting"} onClick={handlePostTask}>
              Save
            </Button>
            {postingError !== null && <Text color="red.400">failed to save task</Text>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default CreateExercisePage;
