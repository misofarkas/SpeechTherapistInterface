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
import { getTask, patchTask, postTask } from "../api/tasksApi";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { getImages } from "../api/imageApi";
import { useQuery, useMutation } from "react-query";
import { taskTypeName } from "../common/typeNameConversion";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function CreateExercisePage() {
  const { id, type } = useParams();
  const { auth } = useAuth();
  const [name, setName] = useState("");
  const [taskType, setTaskType] = useState<TaskType>(TaskType.ConnectPairsTextImage);
  const [savedTaskType, setSavedTaskType] = useState<TaskType>(TaskType.ConnectPairsTextImage);
  const difficulty = Difficulties.Hard;
  const [questions, setQuestions] = useState<FourChoicesQuestion[] | ConnectPairCustomQuestion[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");

  const {
    isLoading: isLoadingImages,
    error: imageError,
    data: imageData,
  } = useQuery("images", () => getImages({ auth }));

  console.log("id type", id, type);
  const { isLoading: isLoadingTask, error: taskError } = useQuery(
    "task",
    () => getTask({ auth, id: id ?? "", type: type ?? "" }),
    {
      enabled: !!id && !!taskType,
      onSuccess: (res) => {
        setName(res.data.name);
        setTaskType(res.data.type);
        setSavedTaskType(res.data.type);
        setQuestions(res.data.questions);
      },
    }
  );

  console.log("states", name, taskType, savedTaskType);
  const {
    isLoading: isSubmitting,
    error: postingError,
    mutate: postTaskMutation,
  } = useMutation(() => postTask({ auth, name, type: savedTaskType, tags: [], questions }));

  const {
    isLoading: isSubmittingEdit,
    error: postingErrorEdit,
    mutate: updateTaskMutation,
  } = useMutation(() => patchTask({ auth, id: id ?? "", name, type: savedTaskType, tags: [], questions }));

  function handleAddQuestion(questions: FourChoicesQuestion[] | ConnectPairCustomQuestion[]) {
    if (
      (savedTaskType === TaskType.FourChoicesImage || savedTaskType === TaskType.FourChoicesText) &&
      isFourChoiceQuestions(questions, savedTaskType)
    ) {
      setQuestions([
        ...questions,
        {
          id: uuidv4(),
          heading: "placeholder",
          choices: [
            {
              id: uuidv4(),
              question_data: "",
              correct_option: "",
              incorrect_option1: "",
              incorrect_option2: "",
              incorrect_option3: "",
            },
          ],
        },
      ]);
    }
    if (
      (savedTaskType === TaskType.ConnectPairsTextText || savedTaskType === TaskType.ConnectPairsTextImage) &&
      isCustomQuestions(questions, savedTaskType)
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
    if (isFourChoiceQuestions(questions, savedTaskType)) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
    if (isCustomQuestions(questions, savedTaskType)) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  }

  function handlePostTask(questions: Question[]) {
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
          (isFourChoiceChoice(choice, savedTaskType) &&
            !choice.question_data &&
            !choice.correct_option &&
            !choice.incorrect_option1 &&
            !choice.incorrect_option2 &&
            !choice.incorrect_option3) ||
          (isCustomChoice(choice, savedTaskType) && !choice.data1 && !choice.data2)
        ) {
          isValid = false;
        }
      });
    });

    if (isValid) {
      if (!id && !type) {
        postTaskMutation();
      } else {
        updateTaskMutation();
      }
    } else {
      setError("not all question are fully filled out");
    }
  }

  function handleUpdateChoice(questionId: string, choiceId: string, input: string, index: number) {
    let newQuestions = cloneDeep(questions);
    let question = isFourChoiceQuestions(newQuestions, taskType)
      ? newQuestions.find((q) => q.id === questionId)
      : newQuestions.find((q) => q.id === questionId);

    if (!question) {
      // couldn't find question
      return;
    }

    let choice = isFourChoiceQuestion(question, savedTaskType)
      ? question.choices.find((c) => c.id === choiceId)
      : question.choices.find((c) => c.id === choiceId);
    if (choice && isFourChoiceChoice(choice, savedTaskType)) {
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
    if (choice && isCustomChoice(choice, savedTaskType)) {
      index === 0 ? (choice.data1 = input) : (choice.data2 = input);
    }

    setQuestions(newQuestions);
  }

  if (isLoadingImages || isLoadingTask) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Settings</Tab>
          <Tab>Questions</Tab>
          <Tab>Upload Custom Image</Tab>
        </TabList>

        <TabPanels>
          {/* Settings tab */}
          <TabPanel>
            <Stack maxW="400px" spacing="0.5rem">
              <Text>Name</Text>
              <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
              <Text>Type</Text>
              <Select value={taskType} onChange={(e) => setTaskType(e.target.value as TaskType)}>
                <option value={TaskType.ConnectPairsTextImage}>
                  {taskTypeName({ taskType: TaskType.ConnectPairsTextImage })}
                </option>
                <option value={TaskType.ConnectPairsTextText}>
                  {taskTypeName({ taskType: TaskType.ConnectPairsTextText })}
                </option>
                <option value={TaskType.FourChoicesImage}>
                  {taskTypeName({ taskType: TaskType.FourChoicesImage })}
                </option>
                <option value={TaskType.FourChoicesText}>{taskTypeName({ taskType: TaskType.FourChoicesText })}</option>
              </Select>
              <Text>Difficulty</Text>
              <Select>
                <option value="easy">Easy</option>
                <option value="hard">Hard</option>
              </Select>
              <Button
                onClick={
                  taskType !== savedTaskType && questions.length !== 0
                    ? onOpen
                    : () => {
                        setSavedTaskType(taskType);
                      }
                }
              >
                Apply settings
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
                        setSavedTaskType(taskType);
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
                  type={savedTaskType}
                  isEditable={true}
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
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default CreateExercisePage;
function typeNameConversions(): import("react").ReactNode {
  throw new Error("Function not implemented.");
}
