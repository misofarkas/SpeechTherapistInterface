import { useState, useEffect } from "react";
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
  useMediaQuery,
  Heading,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import TimePicker, { TimePickerValue } from "react-time-picker";
import { subDays } from "date-fns";
import "./CalendarStyles.css";

type Event = {
  id: string;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
};

type DateRange = {
  start: Date;
  end: Date;
};

function CalendarPage() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan411] = useMediaQuery("(min-width: 411px)");
  const [eventDateRange, setEventDateRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });
  const [eventStartTime, setEventStartTime] = useState<TimePickerValue>("10:00");
  const [eventEndTime, setEventEndTime] = useState<TimePickerValue>("10:00");
  const [events, setEvents] = useState<Event[]>([
    {
      id: "0",
      title: "event 1",
      allDay: false,
      start: new Date("2022-10-01T11:00:00"),
      end: new Date("2022-10-01T11:30:00"),
    },
    {
      id: "1",
      title: "event 4",
      allDay: false,
      start: new Date("2022-10-01T10:30:00"),
      end: new Date("2022-10-01T11:30:00"),
    },
    {
      id: "2",
      title: "event 2",
      allDay: false,
      start: new Date("2022-10-03T12:30:00"),
      end: new Date("2022-10-06T14:30:00"),
    },
    {
      id: "3",
      title: "event 3",
      allDay: false,
      start: new Date("2022-10-13T14:30:00"),
      end: new Date("2022-10-17T14:30:00"),
    },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [eventTitle, setEventTitle] = useState<string>("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  console.log("eventRange start:", eventDateRange.start);
  console.log("eventRange end:", eventDateRange.end);
  function resetDate() {
    setEventDateRange({ start: new Date(), end: new Date() });
    setEventTitle("");
  }

  function handleAddEvent() {
    console.log(eventDateRange?.start.toString());
    console.log(eventDateRange?.end);
    setEvents([
      ...events,
      {
        id: uuidv4(),
        title: eventTitle!,
        allDay: false,
        start: eventDateRange?.start,
        end: eventDateRange?.end,
      },
    ]);

    resetDate();
  }

  return (
    <Container pb="5">
      <Button onClick={onOpen}>Add event</Button>

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
            <Box mx="3">
              <Flex my="1" justifyContent="space-between">
                <Text>from:</Text>
                <Code>{eventDateRange?.start.toString().substring(0, 15)}</Code>
                <TimePicker disableClock={true} onChange={(t) => setEventStartTime(t)} value={eventStartTime} />
              </Flex>
              <Flex my="1" justifyContent="space-between">
                <Text>to:</Text>
                <Code>{eventDateRange?.end.toString().substring(0, 15)}</Code>
                <TimePicker disableClock={true} onChange={(t) => setEventEndTime(t)} value={eventEndTime} />
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={
                eventTitle === "" || eventTitle === undefined || eventStartTime === null || eventEndTime === null
              }
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
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading>{selectedEvent?.title}</Heading>
            <Box mx="3">
              <Flex my="1" justifyContent="space-between">
                <Text>from:</Text>
                <Code>{selectedEvent?.start.toString().substring(0, 24)}</Code>
              </Flex>
              <Flex my="1" justifyContent="space-between">
                <Text>to:</Text>
                <Code>{selectedEvent?.end.toString().substring(0, 24)}</Code>
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Delete
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onEditClose}>
              Close
            </Button>
            <Button variant="ghost">Save?</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FullCalendar
        height={"auto"}
        contentHeight={"auto"}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={(selection) => {
          setEventDateRange({ start: selection.start, end: selection.end });
          setEventStartTime(selection.start);
          setEventEndTime(selection.end);
        }}
        unselectAuto={false}
        unselect={resetDate}
        longPressDelay={0}
        events={events}
        eventClick={(e) => {
          setSelectedEventId(e.event._def.publicId);
          console.log(e.event._def.publicId);
          onEditOpen();
        }}
        dayMaxEventRows={2}
        headerToolbar={{
          left: "title",
          center: "dayGridMonth timeGridWeek",
          right: "today prev,next",
        }}
      />
    </Container>
  );
}

export default CalendarPage;
