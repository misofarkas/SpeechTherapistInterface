import { Box, Text } from "@chakra-ui/react";

function MeetingCard() {
  return (
    <Box
      maxW="400px"
      h="5rem"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      transition="0.2s"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
    >
        <Text>Meeting 1</Text>
    </Box>
  );
}

export default MeetingCard;
