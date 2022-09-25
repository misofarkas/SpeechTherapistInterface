import { Flex, Input } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

type TextSelectionInput = {
  id: number,
  selectedInputId: number,
  setSelectedInputId: React.Dispatch<React.SetStateAction<number>>
}

function QuestionTextInput({ id, selectedInputId, setSelectedInputId }: TextSelectionInput) {
  const isSelected = id === selectedInputId;

  return (
    <Flex gap="2" justifyContent="center" alignItems="center">
      <CheckIcon
        h="6"
        w="6"
        borderWidth="0"
        padding="1"
        borderRadius="sm"
        transition="0.2s"
        _hover={{bg: "green.400"}}
        onClick={() => setSelectedInputId(id)}
      />
      <Input
        maxW="300px"
        borderWidth={isSelected ? "2px" : "1px"}
        borderColor={isSelected ? "green.400" : "gray.200"}
      ></Input>
    </Flex>
  );
}

export default QuestionTextInput;
