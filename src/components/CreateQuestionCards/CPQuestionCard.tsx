import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Icon, Center, useMediaQuery, Input, Image, CloseButton } from "@chakra-ui/react";
import { clone } from "lodash";
import SelectImageModal from "../SelectImageModal";
import { BsArrowRight } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { ImageData } from "../../data/ImageData";
import { BasicChoice, Question } from "../../data/GeneratedCPExercise";

type ImageId = string | undefined;

type CPSelectedImageIds = [ImageId, ImageId, ImageId];

function CPQuestionCard({
  type,
  isEditable,
  question,
  handleUpdateChoice = undefined,
  handleDeleteQuestion = undefined,
  imageData = undefined,
}: {
  type: string;
  isEditable: boolean;
  question: Question;
  handleUpdateChoice?: ((a: string, b: string, c: string | undefined, d: string | undefined) => void) | undefined;
  handleDeleteQuestion?: ((a: string) => void) | undefined;
  imageData?: BasicChoice[] | undefined;
}) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const gridItemWidth = isLargerThan768 ? "150px" : "75px";
  const gridItemHeight = type === "image" ? (isLargerThan768 ? "150px" : "75px") : "40px";
  const iconSize = isLargerThan768 ? "75px" : "50px";

  return (
    <Box maxW="800px" mx="auto" p="1rem 2rem" borderWidth="1px" borderRadius="lg" boxShadow="md">
      {isEditable && <CloseButton ml="95%" mb="2" onClick={() => handleDeleteQuestion!(question.id)}></CloseButton>}
      <Grid templateRows="repeat(3, 1fr)" templateColumns="1fr 0.3fr 1fr" gap={4}>
        <TextGridItem
          value={question.choices[0].text}
          itemHeight={gridItemHeight}
          onChange={(e) => {
            handleUpdateChoice !== undefined && handleUpdateChoice(question.id, question.choices[0].id, e, undefined);
          }}
        />

        <IconGridItem icon={BsArrowRight} itemWidth={gridItemWidth} itemHeight={gridItemHeight} iconSize={iconSize} />

        {type === "image" ? (
          isEditable ? (
            <ImageGridItem
              selectedImageUrl={question.choices[3].image ?? ""}
              handleUpdateChoice={handleUpdateChoice}
              itemWidth={gridItemWidth}
              itemHeight={gridItemHeight}
              imageData={imageData ?? []}
              questionId={question.id}
              choiceId={question.choices[3].id}
            />
          ) : (
            <Image
              src={question.choices[0].image ?? ""}
              objectFit="cover"
              boxSize={gridItemWidth}
              borderRadius="lg"
            ></Image>
          )
        ) : (
          <TextGridItem
            value={question.choices[3].text}
            itemHeight={gridItemHeight}
            onChange={(e) => {
              handleUpdateChoice !== undefined && handleUpdateChoice(question.id, question.choices[3].id, e, undefined);
            }}
          />
        )}

        <TextGridItem
          value={question.choices[1].text}
          itemHeight={gridItemHeight}
          onChange={(e) => {
            handleUpdateChoice !== undefined && handleUpdateChoice(question.id, question.choices[1].id, e, undefined);
          }}
        />

        <IconGridItem icon={BsArrowRight} itemWidth={gridItemWidth} itemHeight={gridItemHeight} iconSize={iconSize} />

        {type === "image" ? (
          isEditable ? (
            <ImageGridItem
              selectedImageUrl={question.choices[4].image ?? ""}
              handleUpdateChoice={handleUpdateChoice}
              itemWidth={gridItemWidth}
              itemHeight={gridItemHeight}
              imageData={imageData ?? []}
              questionId={question.id}
              choiceId={question.choices[4].id}
            />
          ) : (
            <Image
              src={question.choices[1].image ?? ""}
              objectFit="cover"
              boxSize={gridItemWidth}
              borderRadius="lg"
            ></Image>
          )
        ) : (
          <TextGridItem
            value={question.choices[4].text}
            itemHeight={gridItemHeight}
            onChange={(e) => {
              handleUpdateChoice !== undefined && handleUpdateChoice(question.id, question.choices[4].id, e, undefined);
            }}
          />
        )}

        <TextGridItem
          value={question.choices[2].text}
          itemHeight={gridItemHeight}
          onChange={(e) => {
            handleUpdateChoice !== undefined && handleUpdateChoice(question.id, question.choices[2].id, e, undefined);
          }}
        />

        <IconGridItem icon={BsArrowRight} itemWidth={gridItemWidth} itemHeight={gridItemHeight} iconSize={iconSize} />

        {type === "image" ? (
          isEditable ? (
            <ImageGridItem
              selectedImageUrl={question.choices[5].image ?? ""}
              handleUpdateChoice={handleUpdateChoice}
              itemWidth={gridItemWidth}
              itemHeight={gridItemHeight}
              imageData={imageData ?? []}
              questionId={question.id}
              choiceId={question.choices[5].id}
            />
          ) : (
            <Image
              src={question.choices[2].image ?? ""}
              objectFit="cover"
              boxSize={gridItemWidth}
              borderRadius="lg"
            ></Image>
          )
        ) : (
          <TextGridItem
            value={question.choices[5].text}
            itemHeight={gridItemHeight}
            onChange={(e) => {
              handleUpdateChoice !== undefined && handleUpdateChoice(question.id, question.choices[5].id, e, undefined);
            }}
          />
        )}
      </Grid>
    </Box>
  );
}

type ImageGridItemArgs = {
  selectedImageUrl: string | undefined;
  handleUpdateChoice: ((a: string, b: string, c: string | undefined, d: string | undefined) => void) | undefined;
  itemWidth: string;
  itemHeight: string;
  imageData: BasicChoice[];
  questionId: string;
  choiceId: string;
};

function ImageGridItem({
  selectedImageUrl,
  handleUpdateChoice,
  itemWidth,
  itemHeight,
  imageData,
  questionId,
  choiceId,
}: ImageGridItemArgs) {
  return (
    <GridItem
      borderWidth={selectedImageUrl !== undefined ? "0" : "1px"}
      borderRadius="lg"
      boxSize={itemWidth}
      textAlign="center"
      cursor="pointer"
      mx="auto"
    >
      <SelectImageModal
        selectedImageUrl={selectedImageUrl}
        handleUpdateChoice={handleUpdateChoice}
        boxSize={itemWidth}
        imageData={imageData}
        questionId={questionId}
        choiceId={choiceId}
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

function IconGridItem({ icon, itemWidth, itemHeight, iconSize }: IconGridItemArgs) {
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
  itemHeight,
  onChange,
}: {
  value: string;
  itemHeight: string;
  onChange: (text: string) => void;
}) {
  return (
    <GridItem>
      <Center h={itemHeight}>
        <Input w="full" value={value} onChange={(e) => onChange(e.target.value)} />
      </Center>
    </GridItem>
  );
}

export default CPQuestionCard;
