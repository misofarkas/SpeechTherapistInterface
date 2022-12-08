import { Box } from "@chakra-ui/react";

/**This component is used to create a visual wrapper
 * around components on the Patient profile page */
function PatientCard({ children }: { children: React.ReactNode }) {
  return (
    <Box w="full" boxShadow="lg" borderRadius={"2xl"} p="5" mb="2" borderWidth={"1px"}>
      {children}
    </Box>
  );
}

export default PatientCard;
