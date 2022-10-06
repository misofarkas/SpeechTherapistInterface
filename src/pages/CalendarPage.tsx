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
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import TimePicker, { TimePickerValue } from "react-time-picker";
import { subDays } from 'date-fns'
import "./CalendarStyles.css";

type Event = {
  id: string;
  title: string;
  allDay: boolean;
  start: string;
  end: string;
};

function CalendarPage() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan411] = useMediaQuery("(min-width: 411px)");
  const [calendarSelection, setCalendarSelection] = useState<DateSelectArg>();
  const [eventStartTime, setEventStartTime] =
    useState<TimePickerValue>("10:00");
  const [eventEndTime, setEventEndTime] = useState<TimePickerValue>("10:00");
  const [events, setEvents] = useState<Event[]>([
    {
      id: "0",
      title: "event 1",
      allDay: false,
      start: "2022-10-01T10:30:00",
      end: "2022-10-01T11:30:00",
    },
    {
      id: "1",
      title: "event 4",
      allDay: false,
      start: "2022-10-01T10:30:00",
      end: "2022-10-01T11:30:00",
    },
    {
      id: "2",
      title: "event 2",
      allDay: false,
      start: "2022-10-03T12:30:00",
      end: "2022-10-06T14:30:00",
    },
    {
      id: "3",
      title: "event 3",
      allDay: false,
      start: "2022-10-13T14:30:00",
      end: "2022-10-17T14:30:00",
    },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventTitle, setEventTitle] = useState<string>("");

  function handleAddEvent() {
    const startDate = new Date(calendarSelection?.startStr! + "T" + eventStartTime).toISOString();
    const endDate = subDays(new Date(calendarSelection?.endStr! + "T" + eventEndTime), 1).toISOString();

    console.log(startDate);
    console.log(endDate);
    setEvents([
      ...events,
      {
        id: uuidv4(),
        title: eventTitle!,
        allDay: false,
        start: startDate,
        end: endDate,
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
            <Box mx="3">
              <Flex my="1" justifyContent="space-between">
                <Text>event start date:</Text>
                <Code>{calendarSelection?.startStr}</Code>
                <TimePicker
                  disableClock={true}
                  onChange={(t) => setEventStartTime(t)}
                  value={eventStartTime}
                />
              </Flex>
              <Flex my="1" justifyContent="space-between">
                <Text>event end date:</Text>
                <Code>{calendarSelection?.endStr}</Code>
                <TimePicker
                  disableClock={true}
                  onChange={(t) => setEventEndTime(t)}
                  value={eventEndTime}
                />
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={
                eventTitle === "" ||
                eventTitle === undefined ||
                eventStartTime === null ||
                eventEndTime === null
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
      <FullCalendar
        height={"auto"}
        contentHeight={"auto"}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={(selection) => setCalendarSelection(selection)}
        unselectAuto={false}
        unselect={() => setCalendarSelection(undefined)}
        longPressDelay={0}
        events={events}
        eventClick={(e) => {
          console.log(e);
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
