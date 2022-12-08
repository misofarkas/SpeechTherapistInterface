import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  useMediaQuery,
  Text,
  Container,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { getPatients } from "../api/patientsApi";
import { Patient } from "../types/commonTypes";
import { useQuery } from "react-query";
import { adjustStringLength } from "../common/textFormatting";

function Patients() {
  const [filterValue, setFilterValue] = useState("");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { auth } = useAuth();

  // Fetch linked patients
  const { isSuccess, error, data: patientsData } = useQuery("patients", () => getPatients({ auth }));

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterValue(e.target.value);
  }

  let filteredPatientData: Patient[] = [];
  if (isSuccess) {
    // Filter patients by name or email
    filteredPatientData = patientsData.data.filter(
      (patient) =>
        patient.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        patient.email.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  if (error !== null) {
    return <Text>There was an error</Text>;
  }

  return (
    <Container>
      <Input
        placeholder="search patient"
        size="sm"
        w="50%"
        maxW="300px"
        mb="5"
        value={filterValue}
        onChange={handleFilterChange}
      ></Input>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Email</Th>
              {isLargerThan768 && <Th>Assigned Exercises</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {filteredPatientData.map((patient) => {
              return (
                <Tr key={patient.id} transition="0.2s" _hover={{ background: "gray.100" }}>
                  {/* Patient avatar */}
                  <Td maxW="2rem">
                    <Avatar src={patient.image} size={"sm"} />
                  </Td>
                  <Td>
                    {/* Patient name with link to profile */}
                    <Link to={`/patient-profile/${patient.id}`}>{adjustStringLength(patient.name, 15)}</Link>
                  </Td>
                  {/* Patient email */}
                  <Td> {adjustStringLength(patient.email, 20)} </Td>
                  {/* Number of assigned tasks */}
                  {isLargerThan768 && <Td>{patient.assigned_tasks.length}</Td>}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Patients;
