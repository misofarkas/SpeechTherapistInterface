import { Link as RouterLink } from "react-router-dom";
import { Flex, LinkBox } from "@chakra-ui/react";
import ExerciseCard from "./ExerciseCard";
import { Task } from "../types/commonTypes";


function ExerciseList({ taskData }: { taskData: Task[]}) {
  return (
    <Flex flexDirection="column" gap="2">
      {taskData.map((task) => {
        return (
          <LinkBox as={RouterLink} key={task.id} to="#">
            <ExerciseCard
              name={task.name}
              favs={20}
              type={String(task.type)}
              difficulty={task.difficulty}
            />
          </LinkBox>
        );
      })}
    </Flex>
  );
}

export default ExerciseList;
