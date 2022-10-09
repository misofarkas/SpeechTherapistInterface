import { useState } from "react";
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
} from "@chakra-ui/react";
import { TagProvider } from "../contexts/TagContext";
import { AddIcon } from "@chakra-ui/icons";
import axios from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import {
  BasicChoice,
  GeneratedTasks,
  Question,
} from "../data/GeneratedCPExercise";
import UploadImage from "../components/UploadImage";

let nextId = 0;

function CreateExercisePage() {
  const TASK_URL = "/task/tasks/";

  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  const [savedType, setSavedType] = useState(1);
  const difficulty = "hard";

  const { auth } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleAddQuestion(heading: string, choices: BasicChoice[]) {
    setQuestions([
      ...questions,
      { id: nextId++, heading: heading, choices: choices },
    ]);
  }

  return (
    <TagProvider>
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
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>
                <Text>Type</Text>
                <Select
                  value={type}
                  onChange={(e) => setType(Number(e.target.value))}
                >
                  <option value={1}>Connect Pairs (Text - Image)</option>
                  <option value={2}>Name Images</option>
                  <option value={3}>Connect Pairs (Text - Text)</option>
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
                      <Text>
                        Changing Task type will delete all created questions
                      </Text>
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
              <QuestionList
                questions={questions}
                type={savedType}
                difficulty={difficulty}
              />
              <Box
                w="full"
                h="5rem"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
                cursor="pointer"
                onClick={() => handleAddQuestion("placeholder", [])}
              >
                <AddIcon color="gray.300" mt="5" w={8} h={8} />
              </Box>
            </TabPanel>

            {/* Help tab */}
            <TabPanel>
              <UploadImage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </TagProvider>
  );
}

export default CreateExercisePage;
