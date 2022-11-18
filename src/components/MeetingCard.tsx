import { Box, Flex, Heading, LinkBox, Stack, Text } from "@chakra-ui/react";
import { Meeting } from "../types/commonTypes";
import { Link as RouterLink } from "react-router-dom";

function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <LinkBox maxW="400px" as={RouterLink} to={"/Calendar"}>
      <Box
        maxW="400px"
        minH="5rem"
        mb="2"
        p="2"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        transition="0.2s"
        _hover={{ boxShadow: "lg", cursor: "pointer" }}
      >
        <Flex gap="2">
          <Text as="b">Meeting: </Text>
          <Text>{meeting.name}</Text>
        </Flex>
        <Flex gap="2">
          <Text as="b">Time:</Text>
          <Text>{new Date(meeting.start_time).toLocaleTimeString("sv")}</Text>
        </Flex>
        <Flex gap="2">
          <Text as="b">With patient:</Text>
          <Text>{meeting.assigned_patient}</Text>
        </Flex>
      </Box>
    </LinkBox>
  );
}

export default MeetingCard;
