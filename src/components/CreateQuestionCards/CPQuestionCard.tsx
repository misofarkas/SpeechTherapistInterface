import { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { cloneDeep } from "lodash";
import SelectImageModal from "../SelectImageModal";

type ImageId = string | undefined;

type CPSelectedImageIds = [
  [ImageId, ImageId],
  [ImageId, ImageId],
  [ImageId, ImageId]
];

function CPQuestionCard() {
  const [selectedImageIds, setSelectedImageIds] = useState<CPSelectedImageIds>([
    [undefined, undefined],
    [undefined, undefined],
    [undefined, undefined],
  ]);

  function handleImageSelection(id: string, index: number) {
    let newSelectedImageIds = cloneDeep(selectedImageIds);
    newSelectedImageIds[Math.floor(index / 2)][index % 2] = id;
    setSelectedImageIds(newSelectedImageIds);
  }

  const itemSize = "150px";
  return (
    <Box
      w="600px"
      mx="auto"
      p="1rem 2rem"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <ImageGridItem
          selectedImageId={selectedImageIds[0][0]}
          handleImageSelection={handleImageSelection}
          index={0}
        />
        <ImageGridItem
          selectedImageId={selectedImageIds[0][1]}
          handleImageSelection={handleImageSelection}
          index={1}
        />
        <ImageGridItem
          selectedImageId={selectedImageIds[1][0]}
          handleImageSelection={handleImageSelection}
          index={2}
        />
        <ImageGridItem
          selectedImageId={selectedImageIds[1][1]}
          handleImageSelection={handleImageSelection}
          index={3}
        />
        <ImageGridItem
          selectedImageId={selectedImageIds[2][0]}
          handleImageSelection={handleImageSelection}
          index={4}
        />
        <ImageGridItem
          selectedImageId={selectedImageIds[2][1]}
          handleImageSelection={handleImageSelection}
          index={5}
        />
      </Grid>
    </Box>
  );
}

type ImageGridItemArgs = {
  selectedImageId: ImageId;
  handleImageSelection: (id: string, index: number) => void;
  index: number;
};

function ImageGridItem({
  selectedImageId,
  handleImageSelection,
  index,
}: ImageGridItemArgs) {
  return (
    <GridItem
      rowSpan={1}
      colSpan={1}
      borderWidth={selectedImageId !== undefined ? "0" : "1px"}
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
        imageIndex={index}
      />
    </GridItem>
  );
}

export default CPQuestionCard;
