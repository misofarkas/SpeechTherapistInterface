import { Box, Flex, Heading, Icon, Tag } from "@chakra-ui/react";
import { AiOutlinePicture, AiFillStar } from "react-icons/ai";

type ExerciseCardInfo = {
  name: string;
  favs: number;
  type: number;
  difficulty: string;
};

function ExerciseCard({ name, favs, type, difficulty }: ExerciseCardInfo) {

  let typeText;
  switch (type) {
    case 1:
      typeText = "Connect Images"
      break;
    case 2:
      typeText = "Connect Text"
      break;
    case 3:
      typeText = "Name Images"
      break;
    default:
      typeText = ""
  }

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
            <Tag>
              <Icon w="4" h="4" as={AiFillStar} mr="1" color="yellow.400" /> {favs}
            </Tag>
            <Tag>{typeText}</Tag>
            <Tag backgroundColor="green.400">{difficulty}</Tag>
          </Flex>
        </div>
      </Flex>
    </Box>
  );
}

export default ExerciseCard;
