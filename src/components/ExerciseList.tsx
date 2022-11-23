import { Link as RouterLink } from "react-router-dom";
import { Flex, LinkBox } from "@chakra-ui/react";
import ExerciseCard from "./ExerciseCard";
import { Task } from "../types/taskTypes";


function ExerciseList({ taskData }: { taskData: Task[]}) {


  return (
    <Flex flexDirection="column" gap="2">
      {taskData.map((task) => {
        return (
          <LinkBox as={RouterLink} key={task.id} to={`/ExercisePreview/${task.type}/${task.id}`}>
            <ExerciseCard
              name={task.name}
              type={task.type}
              difficulty={task.difficulty}
            />
          </LinkBox>
        );
      })}
    </Flex>
  );
}

export default ExerciseList;
