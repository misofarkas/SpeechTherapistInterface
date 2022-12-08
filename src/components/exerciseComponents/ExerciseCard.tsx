import { Box, Flex, Heading, Icon, Tag } from "@chakra-ui/react";
import { AiOutlinePicture, AiFillStar } from "react-icons/ai";
import { BiGridAlt } from "react-icons/bi";
import { taskTypeName } from "../../common/typeNameConversion";
import { TaskType } from "../../types/enums";

type ExerciseCardInfo = {
  name: string;
  type: TaskType;
  difficulty: string;
};

/**This function renders an ExerciseCard component that
 * shows basic information about an exercise. It displays the
 * name of the exercise, its type and difficulty */
function ExerciseCard({ name, type, difficulty }: ExerciseCardInfo) {
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
          </Flex>
        </div>
      </Flex>
    </Box>
  );
}

export default ExerciseCard;
