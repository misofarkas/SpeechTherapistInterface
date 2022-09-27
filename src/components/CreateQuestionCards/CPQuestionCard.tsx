import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Icon,
  Center,
  useMediaQuery,
  Input,
} from "@chakra-ui/react";
import { clone } from "lodash";
import SelectImageModal from "../SelectImageModal";
import { BsArrowRight } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { ImageData } from "../../data/ImageData";

type ImageId = string | undefined;

type CPSelectedImageIds = [ImageId, ImageId, ImageId];

function CPQuestionCard({ type }: { type: string }) {
  const [selectedImageIds, setSelectedImageIds] = useState<CPSelectedImageIds>([
    undefined,
    undefined,
    undefined,
  ]);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const selectedImages = ImageData.filter((image) =>
    selectedImageIds.includes(image.id)
  );
  const textVal0 = selectedImages.find(
    (image) => image.id === selectedImageIds[0]
  )?.textAnswer;
  const textVal1 = selectedImages.find(
    (image) => image.id === selectedImageIds[1]
  )?.textAnswer;
  const textVal2 = selectedImages.find(
    (image) => image.id === selectedImageIds[2]
  )?.textAnswer;

  function handleImageSelection(id: string, index: number) {
    let newSelectedImageIds = clone(selectedImageIds);
    newSelectedImageIds[index] = id;
    setSelectedImageIds(newSelectedImageIds);
  }

  const gridItemWidth = isLargerThan768 ? "150px" : "75px";
  const gridItemHeight =
    type === "image" ? (isLargerThan768 ? "150px" : "75px") : "40px";
  const iconSize = isLargerThan768 ? "75px" : "50px";

  return (
    <Box
      maxW="800px"
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
        <TextGridItem
          value={textVal0 ?? "undefined"}
          itemWidth={gridItemWidth}
          itemHeight={gridItemHeight}
        />

        <IconGridItem
          icon={BsArrowRight}
          itemWidth={gridItemWidth}
          itemHeight={gridItemHeight}
          iconSize={iconSize}
        />

        {type === "image" ? (
          <ImageGridItem
            selectedImageId={selectedImageIds[0]}
            handleImageSelection={handleImageSelection}
            index={0}
            itemWidth={gridItemWidth}
            itemHeight={gridItemHeight}
          />
        ) : (
          <TextGridItem
            value=""
            itemWidth={gridItemWidth}
            itemHeight={gridItemHeight}
          />
        )}

        <TextGridItem
          value={textVal1 ?? "undefined"}
          itemWidth={gridItemWidth}
          itemHeight={gridItemHeight}
        />

        <IconGridItem
          icon={BsArrowRight}
          itemWidth={gridItemWidth}
          itemHeight={gridItemHeight}
          iconSize={iconSize}
        />

        {type === "image" ? (
          <ImageGridItem
            selectedImageId={selectedImageIds[1]}
            handleImageSelection={handleImageSelection}
            index={1}
            itemWidth={gridItemWidth}
            itemHeight={gridItemHeight}
          />
        ) : (
          <TextGridItem
            value=""
            itemWidth={gridItemWidth}
            itemHeight={gridItemHeight}
          />
        )}

        <TextGridItem
          value={textVal2 ?? "undefined"}
          itemWidth={gridItemWidth}
          itemHeight={gridItemHeight}
        />

        <IconGridItem
          icon={BsArrowRight}
          itemWidth={gridItemWidth}
          itemHeight={gridItemHeight}
          iconSize={iconSize}
        />

        {type === "image" ? (
          <ImageGridItem
            selectedImageId={selectedImageIds[2]}
            handleImageSelection={handleImageSelection}
            index={2}
            itemWidth={gridItemWidth}
            itemHeight={gridItemHeight}
          />
        ) : (
          <TextGridItem
            value=""
            itemWidth={gridItemWidth}
            itemHeight={gridItemHeight}
          />
        )}
      </Grid>
    </Box>
  );
}

type ImageGridItemArgs = {
  selectedImageId: ImageId;
  handleImageSelection: (id: string, index: number) => void;
  index: number;
  itemWidth: string;
  itemHeight: string;
};

function ImageGridItem({
  selectedImageId,
  handleImageSelection,
  index,
  itemWidth,
  itemHeight,
}: ImageGridItemArgs) {
  return (
    <GridItem
      borderWidth={selectedImageId !== undefined ? "0" : "1px"}
      borderRadius="lg"
      boxSize={itemWidth}
      textAlign="center"
      cursor="pointer"
      mx="auto"
    >
      <SelectImageModal
        selectedImageId={selectedImageId}
        setSelectedImageId={handleImageSelection}
        boxSize={itemWidth}
        imageIndex={index}
      />
    </GridItem>
  );
}

type IconGridItemArgs = {
  icon: IconType;
  itemWidth: string;
  itemHeight: string;
  iconSize: string;
};

function IconGridItem({
  icon,
  itemWidth,
  itemHeight,
  iconSize,
}: IconGridItemArgs) {
  return (
    <GridItem>
      <Center w={itemWidth} h={itemHeight}>
        <Icon color="gray.300" boxSize={iconSize} as={icon}></Icon>
      </Center>
    </GridItem>
  );
}

function TextGridItem({
  value,
  itemWidth,
  itemHeight,
}: {
  value: string;
  itemWidth: string;
  itemHeight: string;
}) {
  return (
    <GridItem>
      <Center h={itemHeight}>
        <Input w="full" value={value} />
      </Center>
    </GridItem>
  );
}

export default CPQuestionCard;
