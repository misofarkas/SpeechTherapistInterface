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
  useDisclosure,
} from "@chakra-ui/react";
import { TagProvider } from "../contexts/TagContext";
import axios from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import {
  BasicChoice,
  GeneratedTasks,
  Question,
} from "../data/GeneratedCPExercise";


function CreateGeneratedExercisePage() {
  const TASK_URL = "/task/tasks/";

  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  const { auth } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);

  const difficulty = "easy";

  async function handleTaskGeneration() {
    try {
      const questionData = await axios.get(TASK_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${auth?.accessToken}`,
        },
        withCredentials: false,
      });
      console.log("Questions?");
      console.log(questionData.data);
      console.log(questionData.data[0].questions);
      setQuestions(questionData.data[0].questions);
    } catch (error) {
      console.error(error);
    }

    // Placeholder data, remove later..
    //setQuestions(GeneratedTasks[0].questions);
  }

  return (
    <TagProvider>
      <Container>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Settings</Tab>
            <Tab>Questions</Tab>
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
                </Select>
                <Button onClick={handleTaskGeneration}>Generate</Button>
              </Stack>
            </TabPanel>
            {/* Question tab */}
            <TabPanel>
              <QuestionList
                questions={questions}
                type={type}
                difficulty={difficulty}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </TagProvider>
  );
}

export default CreateGeneratedExercisePage;
