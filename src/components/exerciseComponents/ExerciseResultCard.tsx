import { Box, Flex, Heading, Icon, Tag } from "@chakra-ui/react";
import { AiOutlinePicture } from "react-icons/ai";
import { BiGridAlt } from "react-icons/bi";
import { taskTypeName } from "../../common/typeNameConversion";
import { TaskType } from "../../types/enums";

type ExerciseResultCardArgs = {
  name: string;
  type: TaskType;
  difficulty: string;
  isFinished: boolean;
};

/**This function renders an ExerciseResultCard component that
 * shows basic information about an exercise. It displays the
 * name of the exercise, its type and difficulty, and whether
 * it has been finished. */
function ExerciseResultCard({ name, type, difficulty, isFinished }: ExerciseResultCardArgs) {
  return (
    <Box
      w="full"
      h="5rem"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      transition="0.2s"
      cursor={isFinished ? "pointer" : "default"}
      _hover={{ boxShadow: "lg" }}
    >
      <Flex h="full" px="4" gap="4" alignItems="center">
        <Icon
          w="12"
          h="12"
          as={
            type === TaskType.ConnectPairsTextImage || type === TaskType.ConnectPairsTextText
              ? AiOutlinePicture
              : BiGridAlt
          }
        />
        <div>
          <Heading size="sm" mb="2">
            {name}
          </Heading>
          <Flex gap="2">
            <Tag>{taskTypeName({ taskType: type })}</Tag>
            <Tag backgroundColor="green.400">{difficulty}</Tag>
            {isFinished && <Tag>Finished</Tag>}
          </Flex>
        </div>
      </Flex>
    </Box>
  );
}

export default ExerciseResultCard;
