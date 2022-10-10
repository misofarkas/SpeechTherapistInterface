import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  useMediaQuery,
  Center,
  Input,
} from "@chakra-ui/react";
import { ImageData } from "../../data/ImageData";
import SelectImageModal from "../SelectImageModal";
import { BasicChoice } from "../../data/GeneratedCPExercise";

function NIQuestionCard({isEditable, imageData} : {isEditable: boolean, imageData: BasicChoice[] | undefined}) {
  const [selectedInputId, setSelectedInputId] = useState(1);
  const [selectedImageId, setSelectedImageId] = useState<string | undefined>();
  
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const selectedImage = ImageData.find((image) => image.id === selectedImageId);
  function handleImageSelection(id: string, index: number) {
    setSelectedImageId(id);
  }

  const templateRowsLg = "repeat(2, 1fr)";
  const templateColumnsLg = "0.5fr repeat(2, 1fr)";

  const imageSelected = selectedImageId !== undefined;

  const templateRowsSm = "1fr repeat(5, 0.3fr)";
  const templateColumnsSm = "1fr";
  return (
    <Box
      w="full"
      p="1rem 2rem"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Grid
        templateRows={isLargerThan768 ? templateRowsLg : templateRowsSm}
        templateColumns={
          isLargerThan768 ? templateColumnsLg : templateColumnsSm
        }
        gap={4}
        textAlign="center"
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          borderWidth={imageSelected ? "0" : "1px"}
          borderRadius="lg"
          h="150px"
          textAlign="center"
          cursor="pointer"
          w="150px"
          mx="auto"
        >
          <SelectImageModal
            selectedImageId={selectedImageId}
            setSelectedImageId={handleImageSelection}
            boxSize="150px"
            imageIndex={undefined}
            imageData={imageData ?? []}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input isDisabled={true}  value={selectedImage?.textAnswer} maxW="400px" borderWidth="2px" borderColor="green.400" />
        </GridItem>
        <GridItem colSpan={1}>
          <Input maxW="400px" borderWidth="1px" borderColor="gray.200" />
        </GridItem>
        <GridItem colSpan={1}>
          <Input maxW="400px" borderWidth="1px" borderColor="gray.200" />
        </GridItem>
        <GridItem colSpan={1}>
          <Input maxW="400px" borderWidth="1px" borderColor="gray.200" />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default NIQuestionCard;
