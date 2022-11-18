import { Box, Flex, Heading, Icon, Tag } from "@chakra-ui/react";
import { AiOutlinePicture, AiFillStar } from "react-icons/ai";
import { taskTypeName } from "../common/typeNameConversion";
import { TaskType } from "../types/enums";

type ExerciseResultCardArgs = {
  name: string;
  type: TaskType;
  difficulty: string;
  isFinished: boolean;
};

function ExerciseResultCard({ name, type, difficulty, isFinished }: ExerciseResultCardArgs) {
  return (
    <Box
      w="full"
      h="5rem"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      transition="0.2s"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
    >
      <Flex h="full" px="4" gap="4" alignItems="center">
        <Icon w="12" h="12" as={AiOutlinePicture} />
        <div>
          <Heading size="sm" mb="2">
            {name}
          </Heading>
          <Flex gap="2">
            <Tag>{taskTypeName({taskType: type})}</Tag>
            <Tag backgroundColor="green.400">{difficulty}</Tag>
            {isFinished && <Tag>Finished</Tag>}
          </Flex>
        </div>
      </Flex>
    </Box>
  );
}

export default ExerciseResultCard;
