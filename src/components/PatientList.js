import React from "react";
import { PatientData } from "../data/PatientData";
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
} from "@chakra-ui/react";

function PatientList() {
  const [filterValue, setFilterValue] = useState("");
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  function handleFilterChange(e) {
    setFilterValue(e.target.value);
  }

  const filteredPatientData = PatientData.filter((patient) =>
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
              
              <Th className="email">Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPatientData.map((patient) => {
              return (
                <Tr key={patient.id} transition="0.2s" _hover={{background: "gray.100"}}>
                  <Td>
                    <Link
                      to={`/patient-profile/${patient.id}`}
                    >
                      {adjustStringLength(patient.name, 15)}
                    </Link>
                  </Td>
                  {isLargerThan992 && <Td isNumeric> {patient.age} </Td>}
                  {isLargerThan768 && <Td> {patient.phoneNumber} </Td> }
                  <Td className="email">
                    {" "}
                    {adjustStringLength(patient.email, 20)}{" "}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

function adjustStringLength(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}

export default PatientList;
