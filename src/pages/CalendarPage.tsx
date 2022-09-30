import { useState } from "react";
import {
  Box,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Text,
  Code,
  Flex,
} from "@chakra-ui/react";
import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function CalendarPage() {
  const [calendarSelection, setCalendarSelection] = useState<DateSelectArg>();
  const [events, setEvents] = useState<
    { title: string; start: string; end: string }[]
  >([
    { title: "event 1", start: "2022-09-01", end: "2022-09-01" },
    { title: "event 2", start: "2022-09-03", end: "2022-09-06" },
    { title: "event 3", start: "2022-09-13", end: "2022-09-17" },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventTitle, setEventTitle] = useState<string>("");

  function handleAddEvent() {
    console.log(calendarSelection);
    setEvents([
      ...events,
      {
        title: eventTitle!,
        start: calendarSelection?.startStr!,
        end: calendarSelection?.endStr!,
      },
    ]);
    setCalendarSelection(undefined);
    setEventTitle("");
  }

  return (
    <Container>
      <Button isDisabled={calendarSelection === undefined} onClick={onOpen}>
        Add event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={eventTitle}
              onChange={(title) => setEventTitle(title.target.value)}
              placeholder="event title"
            />
            <Flex mx="3" my="1" justifyContent="space-between">
              <Text>event start date:</Text>
              <Code mr="20%">{calendarSelection?.startStr}</Code>
            </Flex>
            <Flex mx="3" my="1" justifyContent="space-between">
              <Text>event end date:</Text>
              <Code mr="20%">{calendarSelection?.endStr}</Code>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={eventTitle === "" || eventTitle === undefined}
              colorScheme="blue"
              onClick={() => {
                onClose();
                handleAddEvent();
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={(selection) => setCalendarSelection(selection)}
        unselectAuto={false}
        unselect={() => setCalendarSelection(undefined)}
        events={events}
        headerToolbar={{
          left: "title",
          center: "",
          right: "today prev,next",
        }}
      />
    </Container>
  );
}

export default CalendarPage;
