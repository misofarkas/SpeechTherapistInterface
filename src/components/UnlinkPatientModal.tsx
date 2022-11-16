import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { unlinkPatient } from "../api/patientsApi";
import { useAuth } from "../contexts/AuthContext";

function UnlinkPatientModal({ patientName, patientId }: { patientName: string; patientId: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const {
    isError,
    isLoading,
    mutate: unlinkMutation,
  } = useMutation(unlinkPatient, {
    onSuccess: () => {
      navigate(`/Patients`);
    },
  });
  return (
    <>
      <Button onClick={onOpen}>Unlink patient</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unlink patient</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to unlink patient {patientName}?</Text>
            <Text>This will unassing tasks and delete meetings</Text>
          </ModalBody>

          <ModalFooter>
            {isError && <Text mr="5" color="red.500">There has been an error</Text>}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" isLoading={isLoading} onClick={() => unlinkMutation({ auth, id: patientId })}>
              Unlink
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UnlinkPatientModal;
