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
  Text,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./CalendarStyles.css";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { deleteMeeting, getMeetings, postMeeting, updateMeeting } from "../api/meetingsApi";
import { useAuth } from "../contexts/AuthContext";
import { getPatients } from "../api/patientsApi";
import { Event } from "../types/meetingTypes";

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
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const queryClient = useQueryClient();
  const { data: patientData } = useQuery("patients", () => getPatients({ auth }));
  const { data: meetings } = useQuery("meetings", () => getMeetings({ auth }));

  const addMeetingMutation = useMutation(postMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetings");
    },
  });
  const deleteMeetingMutation = useMutation(deleteMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetings");
    },
  });
  const updateMeetingMutation = useMutation(updateMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetings");
    },
  });

  function resetEvent() {
    setCurrentEvent({ id: "", title: "", assignedPatient: "", start: new Date(), end: new Date() });
  }

  function handleAddMeeting() {
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

  function handleDeleteMeeting() {
    deleteMeetingMutation.mutate({
      auth,
      id: currentEvent.id,
    });

    resetEvent();
  }

  function handleUpdateMeeting() {
    updateMeetingMutation.mutate({
      auth,
      meeting: {
        name: currentEvent.title,
        created_by: user.id,
        assigned_patient: currentEvent.assignedPatient,
        start_time: currentEvent.start.toISOString(),
        end_time: currentEvent.end.toISOString(),
      },
      id: currentEvent.id,
    });
  }

  return (
    <Container pb="5">
      {/* Schedule new meeting button */}
      <Button
        onClick={() => {
          onOpen();
          setIsEditing(false);
        }}
      >
        Schedule new meeting
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetEvent();
        }}
      >
        {/* New meeting modal */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? "Edit meeting" : "Schedule meeting"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {/* Meeting title */}
              <Input
                value={currentEvent.title}
                onChange={(title) => setCurrentEvent({ ...currentEvent, title: title.target.value })}
                placeholder="event title"
                size="md"
              />
              {/* Assigned patient */}
              <Select
                placeholder="Select a patient"
                value={currentEvent.assignedPatient}
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
              {/* Start time */}
              <Input
                maxW="13rem"
                value={currentEvent.start.toLocaleString("sv")}
                onChange={(e) => setCurrentEvent({ ...currentEvent, start: new Date(e.target.value) })}
                type="datetime-local"
              />
              {/* End time */}
              <Input
                maxW="13rem"
                value={currentEvent.end.toLocaleString("sv")}
                onChange={(e) => setCurrentEvent({ ...currentEvent, end: new Date(e.target.value) })}
                type="datetime-local"
              />
              {currentEvent.start > currentEvent.end && <Text color={"red.500"}>Invalid date</Text>}
            </Stack>
          </ModalBody>

          <ModalFooter>
            {/* Delete button */}
            {isEditing && !isConfirmingDelete && (
              <Button
                colorScheme="red"
                mr="15.7rem"
                display={currentEvent ? "" : "none"}
                onClick={() => setIsConfirmingDelete(true)}
              >
                Delete
              </Button>
            )}

            {/* Confirm deletion button */}
            {isEditing && isConfirmingDelete && (
              <>
                <Button mr="1rem" onClick={() => setIsConfirmingDelete(false)}>
                  Cancel
                </Button>
                <Button
                  mr="4.5rem"
                  colorScheme="red"
                  onClick={() => {
                    onClose();
                    handleDeleteMeeting();
                    setIsConfirmingDelete(false);
                  }}
                >
                  Confirm Deletion
                </Button>
              </>
            )}

            {/* Save button */}
            <Button
              isDisabled={
                currentEvent.title === "" ||
                !currentEvent.assignedPatient ||
                currentEvent.start > currentEvent.end ||
                currentEvent.start.toString() === "Invalid Date" ||
                currentEvent.end.toString() === "Invalid Date"
              }
              colorScheme="blue"
              onClick={() => {
                onClose();
                isEditing ? handleUpdateMeeting() : handleAddMeeting();
              }}
            >
              Save
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
          setIsEditing(true);
          setIsConfirmingDelete(false);
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
