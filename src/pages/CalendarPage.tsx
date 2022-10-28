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
  Stack,
  Divider,
  Select,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./CalendarStyles.css";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getMeetings, postMeetings } from "../api/meetingsApi";
import { useAuth } from "../contexts/AuthContext";
import { getPatients } from "../api/patientsApi";
import { Event } from "../types/commonTypes";

function CalendarPage() {
  const { auth, user } = useAuth();
  const [currentEvent, setCurrentEvent] = useState<Event>({
    id: "",
    title: "",
    assignedPatient: "",
    start: new Date(),
    end: new Date(),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { data: patientData } = useQuery("patients", () => getPatients({ auth }));
  const { isLoading, isError, error, data: meetings } = useQuery("meetings", () => getMeetings({ auth }));
  const addMeetingMutation = useMutation(postMeetings, {
    onSuccess: () => {
      console.log("invalidating meetings");
      queryClient.invalidateQueries("meetings");
    },
  });

  function resetEvent() {
    setCurrentEvent({ id: "", title: "", assignedPatient: "", start: new Date(), end: new Date() });
  }

  function handleAddEvent() {
    addMeetingMutation.mutate({
      auth,
      meeting: {
        name: currentEvent.title,
        created_by: user.id,
        assigned_patient: currentEvent.assignedPatient,
        start_time: currentEvent.start.toISOString(),
        end_time: currentEvent.end.toISOString(),
      },
    });

    resetEvent();
  }

  return (
    <Container pb="5">
      <Button onClick={onOpen}>Add event</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetEvent();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Input
                value={currentEvent.title}
                onChange={(title) => setCurrentEvent({ ...currentEvent, title: title.target.value })}
                placeholder="event title"
                size="md"
              />
              <Select
                placeholder="Select a patient"
                onChange={(e) => setCurrentEvent({ ...currentEvent, assignedPatient: e.target.value })}
              >
                {patientData?.data.map((patient) => {
                  return (
                    <option key={patient.id} value={patient.email}>
                      {patient.name}
                    </option>
                  );
                })}
              </Select>
              <Divider />
              <Input
                maxW="12.5rem"
                value={currentEvent.start.toLocaleString("sv")}
                onChange={(e) => setCurrentEvent({ ...currentEvent, start: new Date(e.target.value) })}
                type="datetime-local"
              />
              <Input
                maxW="12.5rem"
                value={currentEvent.end.toLocaleString("sv")}
                onChange={(e) => setCurrentEvent({ ...currentEvent, end: new Date(e.target.value) })}
                type="datetime-local"
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} display={currentEvent ? "" : "none"}>
              Delete
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={currentEvent.title === ""}
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
        timeZone="local"
        contentHeight={"auto"}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={(selection) => {
          setCurrentEvent({ ...currentEvent, start: selection.start, end: selection.end });
        }}
        unselectAuto={false}
        unselect={resetEvent}
        longPressDelay={0}
        events={meetings?.data.map((meeting) => ({
          id: meeting.id,
          title: meeting.name,
          start: new Date(meeting.start_time),
          end: new Date(meeting.end_time),
        }))}
        eventClick={(e) => {
          const meeting = meetings?.data.find((m) => String(m.id) === e.event._def.publicId)!;
          setCurrentEvent({
            id: meeting.id!,
            title: meeting.name,
            assignedPatient: meeting.assigned_patient,
            start: new Date(meeting.start_time),
            end: new Date(meeting.end_time),
          });
          onOpen();
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
