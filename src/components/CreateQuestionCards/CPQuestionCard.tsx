import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Icon,
  Center,
  useMediaQuery,
  Input,
  Image,
} from "@chakra-ui/react";
import { clone } from "lodash";
import SelectImageModal from "../SelectImageModal";
import { BsArrowRight } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { ImageData } from "../../data/ImageData";
import { BasicChoice } from "../../data/GeneratedCPExercise";

type ImageId = string | undefined;

type CPSelectedImageIds = [ImageId, ImageId, ImageId];

function CPQuestionCard({
  type,
  isEditable,
  choices = [],
}: {
  type: string;
  isEditable: boolean;
  choices: BasicChoice[];
}) {
  const [selectedImageIds, setSelectedImageIds] = useState<CPSelectedImageIds>([
    undefined,
    undefined,
    undefined,
  ]);
  const [textInputs, setTextInputs] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  function handleImageSelection(id: string, index: number) {
    let newSelectedImageIds = clone(selectedImageIds);
    newSelectedImageIds[index] = id;
    setSelectedImageIds(newSelectedImageIds);
  }

  function handleTextChange(text: string, index: number) {
    let newTextChoices = clone(textInputs);
    newTextChoices[index] = text;
    setTextInputs(newTextChoices);
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
          value={isEditable ? textInputs[0] : choices[0].text}
          index={0}
          itemHeight={gridItemHeight}
          onChange={handleTextChange}
        />

        <IconGridItem
          icon={BsArrowRight}
          itemWidth={gridItemWidth}
          itemHeight={gridItemHeight}
          iconSize={iconSize}
        />

        {type === "image" ? (
          isEditable ? (
            <ImageGridItem
              selectedImageId={selectedImageIds[0]}
              handleImageSelection={handleImageSelection}
              index={0}
              itemWidth={gridItemWidth}
              itemHeight={gridItemHeight}
            />
          ) : (
            <Image
              src={choices[0].image}
              objectFit="cover"
              boxSize={gridItemWidth}
              borderRadius="lg"
            ></Image>
          )
        ) : (
          <TextGridItem
            value={isEditable ? textInputs[3] : choices[3].text}
            index={3}
            itemHeight={gridItemHeight}
            onChange={handleTextChange}
          />
        )}

        <TextGridItem
          value={isEditable ? textInputs[1] : choices[1].text}
          index={1}
          itemHeight={gridItemHeight}
          onChange={handleTextChange}
        />

        <IconGridItem
          icon={BsArrowRight}
          itemWidth={gridItemWidth}
          itemHeight={gridItemHeight}
          iconSize={iconSize}
        />

        {type === "image" ? (
          isEditable ? (
            <ImageGridItem
              selectedImageId={selectedImageIds[1]}
              handleImageSelection={handleImageSelection}
              index={1}
              itemWidth={gridItemWidth}
              itemHeight={gridItemHeight}
            />
          ) : (
            <Image
              src={choices[1].image}
              objectFit="cover"
              boxSize={gridItemWidth}
              borderRadius="lg"
            ></Image>
          )
        ) : (
          <TextGridItem
            value={isEditable ? textInputs[4] : choices[4].text}
            index={4}
            itemHeight={gridItemHeight}
            onChange={handleTextChange}
          />
        )}

        <TextGridItem
          value={isEditable ? textInputs[2] : choices[2].text}
          index={2}
          itemHeight={gridItemHeight}
          onChange={handleTextChange}
        />

        <IconGridItem
          icon={BsArrowRight}
          itemWidth={gridItemWidth}
          itemHeight={gridItemHeight}
          iconSize={iconSize}
        />

        {type === "image" ? (
          isEditable ? (
            <ImageGridItem
              selectedImageId={selectedImageIds[2]}
              handleImageSelection={handleImageSelection}
              index={2}
              itemWidth={gridItemWidth}
              itemHeight={gridItemHeight}
            />
          ) : (
            <Image
              src={choices[2].image}
              objectFit="cover"
              boxSize={gridItemWidth}
              borderRadius="lg"
            ></Image>
          )
        ) : (
          <TextGridItem
            value={isEditable ? textInputs[5] : choices[5].text}
            index={5}
            itemHeight={gridItemHeight}
            onChange={handleTextChange}
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
  index,
  itemHeight,
  onChange,
}: {
  value: string;
  index: number;
  itemHeight: string;
  onChange: (text: string, index: number) => void;
}) {
  return (
    <GridItem>
      <Center h={itemHeight}>
        <Input w="full" value={value} onChange={(text) => onChange(text.target.value, index)}/>
      </Center>
    </GridItem>
  );
}

export default CPQuestionCard;
