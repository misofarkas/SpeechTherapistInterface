import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Icon,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import { cloneDeep } from "lodash";
import SelectImageModal from "../SelectImageModal";
import { BsArrowRight } from "react-icons/bs";
import { IconType } from "react-icons/lib";

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

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  function handleImageSelection(id: string, index: number) {
    let newSelectedImageIds = cloneDeep(selectedImageIds);
    newSelectedImageIds[Math.floor(index / 2)][index % 2] = id;
    setSelectedImageIds(newSelectedImageIds);
  }

  const itemSize = isLargerThan768 ? "150px" : "75px";
  const iconSize = isLargerThan768 ? "75px" : "50px";

  return (
    <Box
      maxW="600px"
      mx="auto"
      p="1rem 2rem"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="1fr 0.3fr 1fr"
        gap={4}
      >
        <ImageGridItem
          selectedImageId={selectedImageIds[0][0]}
          handleImageSelection={handleImageSelection}
          index={0}
          itemSize={itemSize}
        />

        <IconGridItem
          icon={BsArrowRight}
          itemSize={itemSize}
          iconSize={iconSize}
        />

        <ImageGridItem
          selectedImageId={selectedImageIds[0][1]}
          handleImageSelection={handleImageSelection}
          index={1}
          itemSize={itemSize}
        />

        <ImageGridItem
          selectedImageId={selectedImageIds[1][0]}
          handleImageSelection={handleImageSelection}
          index={2}
          itemSize={itemSize}
        />

        <IconGridItem
          icon={BsArrowRight}
          itemSize={itemSize}
          iconSize={iconSize}
        />

        <ImageGridItem
          selectedImageId={selectedImageIds[1][1]}
          handleImageSelection={handleImageSelection}
          index={3}
          itemSize={itemSize}
        />

        <ImageGridItem
          selectedImageId={selectedImageIds[2][0]}
          handleImageSelection={handleImageSelection}
          index={4}
          itemSize={itemSize}
        />

        <IconGridItem
          icon={BsArrowRight}
          itemSize={itemSize}
          iconSize={iconSize}
        />

        <ImageGridItem
          selectedImageId={selectedImageIds[2][1]}
          handleImageSelection={handleImageSelection}
          index={5}
          itemSize={itemSize}
        />
      </Grid>
    </Box>
  );
}

type ImageGridItemArgs = {
  selectedImageId: ImageId;
  handleImageSelection: (id: string, index: number) => void;
  index: number;
  itemSize: string;
};

function ImageGridItem({
  selectedImageId,
  handleImageSelection,
  index,
  itemSize,
}: ImageGridItemArgs) {
  return (
    <GridItem
      borderWidth={selectedImageId !== undefined ? "0" : "1px"}
      borderRadius="lg"
      boxSize={itemSize}
      textAlign="center"
      cursor="pointer"
      mx="auto"
    >
      <SelectImageModal
        selectedImageId={selectedImageId}
        setSelectedImageId={handleImageSelection}
        boxSize={itemSize}
        imageIndex={index}
      />
    </GridItem>
  );
}

type IconGridItemArgs = {
  icon: IconType;
  itemSize: string;
  iconSize: string;
};

function IconGridItem({ icon, itemSize, iconSize }: IconGridItemArgs) {
  return (
    <GridItem>
      <Center w={iconSize} h={itemSize}>
        <Icon boxSize={iconSize} as={icon}></Icon>
      </Center>
    </GridItem>
  );
}

export default CPQuestionCard;
