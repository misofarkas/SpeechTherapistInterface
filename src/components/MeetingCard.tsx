import { Box, Flex, Heading, LinkBox, Stack, Text } from "@chakra-ui/react";
import { Meeting } from "../types/meetingTypes";

function MeetingCard({ meeting, displayName }: { meeting: Meeting; displayName: boolean }) {
  return (
    <Box
      w="full"
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
        <Text as="b">Start time:</Text>
        <Text>{new Date(meeting.start_time).toLocaleTimeString("sv")}</Text>
      </Flex>
      {displayName && (
        <Flex gap="2">
          <Text as="b">With patient:</Text>
          <Text>{meeting.assigned_patient}</Text>
        </Flex>
      )}
    </Box>
  );
}

export default MeetingCard;
