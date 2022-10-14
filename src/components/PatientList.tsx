import { PatientData } from "../data/PatientData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, useMediaQuery } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import getPatients from "../api/getPatients";
import { Patient } from "../types/commonTypes";

function PatientList() {
  const [filterValue, setFilterValue] = useState("");
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [error, setError] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const { auth } = useAuth();

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterValue(e.target.value);
  }

  useEffect(() => {
    getPatients({ auth, setError }).then((value) => {
      setPatients(value);
    });
  }, []);

  const filteredPatientData = patients.filter((patient) =>
    patient.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <>
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
              <Th>Name</Th>
              {isLargerThan992 && <Th isNumeric>Age</Th>}
              {isLargerThan768 && <Th>Phone number</Th>}

              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPatientData.map((patient) => {
              return (
                <Tr key={patient.id} transition="0.2s" _hover={{ background: "gray.100" }}>
                  <Td>
                    <Link to={`/patient-profile/${patient.id}`}>{adjustStringLength(patient.name, 15)}</Link>
                  </Td>
                  {/*
                  {isLargerThan992 && <Td isNumeric> {patient.age} </Td>}
                  {isLargerThan768 && <Td> {patient.phoneNumber} </Td>}
                  */}
                  <Td isNumeric>33</Td>
                  <Td> +420 000 000 000 </Td>
                  <Td> {adjustStringLength(patient.email, 20)} </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

function adjustStringLength(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}

export default PatientList;
