import { Box, Grid, GridItem, Icon, Center, useMediaQuery, Input, Image, CloseButton } from "@chakra-ui/react";
import SelectImageModal from "../SelectImageModal";
import { BsArrowRight } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { CustomChoice, ConnectPairCustomQuestion } from "../../types/questionTypes";
import { TaskType } from "../../types/enums";

function CPQuestionCard({
  type,
  isEditable,
  question,
  handleUpdateChoice = undefined,
  handleDeleteQuestion = undefined,
  imageData = undefined,
}: {
  type: TaskType;
  isEditable: boolean;
  question: ConnectPairCustomQuestion;
  handleUpdateChoice?: ((a: string, b: string, c: string, d: number) => void) | undefined;
  handleDeleteQuestion?: ((a: string) => void) | undefined;
  imageData?: CustomChoice[] | undefined;
}) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const gridItemWidth = isLargerThan768 ? "150px" : "75px";
  const gridItemHeight = type === TaskType.ConnectPairsTextImage ? (isLargerThan768 ? "150px" : "75px") : "40px";
  const iconSize = isLargerThan768 ? "75px" : "50px";
  const indexes = [0, 1, 2];

  console.log(type, isEditable);
  return (
    <Box maxW="800px" mx="auto" p="1rem 2rem" borderWidth="1px" borderRadius="lg" boxShadow="md">
      {isEditable && <CloseButton ml="95%" mb="2" onClick={() => handleDeleteQuestion!(question.id)}></CloseButton>}
      <Grid templateRows="repeat(3, 1fr)" templateColumns="1fr 0.3fr 1fr" gap={4}>
        {indexes.map((i) => {
          return (
            <>
              <TextGridItem
                value={question.choices[i].data1}
                itemHeight={gridItemHeight}
                onChange={(e) => {
                  handleUpdateChoice !== undefined && handleUpdateChoice(question.id, question.choices[i].id, e, 0);
                }}
              />

              <IconGridItem
                icon={BsArrowRight}
                itemWidth={gridItemWidth}
                itemHeight={gridItemHeight}
                iconSize={iconSize}
              />

              {type === TaskType.ConnectPairsTextImage ? (
                isEditable ? (
                  <ImageGridItem
                    selectedImageUrl={question.choices[i].data2 ?? ""}
                    handleUpdateChoice={handleUpdateChoice}
                    itemWidth={gridItemWidth}
                    itemHeight={gridItemHeight}
                    imageData={imageData ?? []}
                    questionId={question.id}
                    choiceId={question.choices[i].id}
                  />
                ) : (
                  <Image
                    src={question.choices[i].data2 ?? ""}
                    objectFit="cover"
                    boxSize={gridItemWidth}
                    borderRadius="lg"
                  ></Image>
                )
              ) : (
                <TextGridItem
                  value={question.choices[i].data2}
                  itemHeight={gridItemHeight}
                  onChange={(e) => {
                    handleUpdateChoice !== undefined && handleUpdateChoice(question.id, question.choices[i].id, e, 1);
                  }}
                />
              )}
            </>
          );
        })}
      </Grid>
    </Box>
  );
}

type ImageGridItemArgs = {
  selectedImageUrl: string | undefined;
  handleUpdateChoice: ((a: string, b: string, c: string, d: number) => void) | undefined;
  itemWidth: string;
  itemHeight: string;
  imageData: CustomChoice[];
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
    <GridItem boxSize={itemWidth} textAlign="center" cursor="pointer" mx="auto">
      <SelectImageModal
        selectedImageUrl={selectedImageUrl}
        handleUpdateChoice={handleUpdateChoice}
        boxSize={itemWidth}
        imageData={imageData}
        questionId={questionId}
        choiceId={choiceId}
        changeIndex={1}
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
