import { Box, Flex, Heading, LinkBox, Stack, Text } from "@chakra-ui/react";
import { Meeting } from "../types/meetingTypes";

/**This component displays a card with details about a meeting.
 * The card shows the meeting name, start time, and, if displayName is true,
 * the name of the assigned patient. */
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
        <Text>{new Date(meeting.start_time).toString().substring(0, 24)}</Text>
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
