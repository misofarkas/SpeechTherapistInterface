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

let nextId = 0;

type Question = {
  id: number
}

function CreateExercisePage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [savedType, setSavedType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [questions, setQuestions] = useState<Question[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleAddQuestion() {
    setQuestions([...questions, { id: nextId++ }]);
  }

  return (
    <TagProvider>
      <Container>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Settings</Tab>
            <Tab>Questions</Tab>
            <Tab>Something else maybe</Tab>
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
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Connect Images">Connect Images</option>
                  <option value="Name Images">Name Images</option>
                </Select>
                <Text>Difficulty</Text>
                <Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Select>
                <Button
                  onClick={
                    type !== savedType && questions.length !== 0
                      ? onOpen
                      : undefined
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
              <QuestionList questions={questions} />
              <Box
                w="full"
                h="5rem"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
                cursor="pointer"
                onClick={handleAddQuestion}
              >
                <AddIcon color="gray.300" mt="5" w={8} h={8} />
              </Box>
            </TabPanel>

            {/* Third TBD tab */}
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </TagProvider>
  );
}

export default CreateExercisePage;
