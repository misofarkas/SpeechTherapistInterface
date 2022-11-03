import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Flex,
  Wrap,
  WrapItem,
  Image,
  Center,
  Text,
} from "@chakra-ui/react";
import SelectTags from "./SelectTags";
import { CustomChoice } from "../types/commonTypes";
import { useTagContext } from "../contexts/TagContext";
import { intersection } from "lodash";

type ImageModalArgs = {
  selectedImageUrl: string | undefined;
  handleUpdateChoice: ((a: string, b: string, c: string, d: boolean) => void) | undefined;
  boxSize: string;
  imageData: CustomChoice[];
  questionId: string;
  choiceId: string;
};

function SelectImageModal({
  selectedImageUrl,
  handleUpdateChoice,
  boxSize,
  imageData,
  questionId,
  choiceId,
}: ImageModalArgs) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>();
  const { selectedTags } = useTagContext();
  const selectedImage = imageData.find((image) => image.data2 === selectedImageUrl);
  const imageSelected = selectedImage !== undefined;

  const filteredImages = filterImages(imageData, selectedTags);

  return (
    <>
      <Box onClick={onOpen}>
        {!imageSelected && (
          <Center boxSize={boxSize} borderWidth="1px" borderRadius="lg">
            <Text>Select Image</Text>
          </Center>
        )}
        {imageSelected && (
          <Box>
            <Image
              src={selectedImage.data2}
              alt={selectedImage.data1}
              objectFit="cover"
              boxSize={boxSize}
              borderRadius="lg"
            ></Image>
          </Box>
        )}
      </Box>
      <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="50rem">
          <ModalHeader>Select Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box maxW="125px">
                <SelectTags />
              </Box>
              <Wrap w="full" spacing="0.2rem">
                {filteredImages.map((image) => {
                  return (
                    <WrapItem key={image.id}>
                      <Image
                        src={image.data2}
                        alt={image.data1}
                        objectFit="cover"
                        boxSize="7rem"
                        onClick={() => setPreviewImageUrl(image.data2)}
                        borderRadius="lg"
                        cursor="pointer"
                        border="2px"
                        borderColor={previewImageUrl === image.data2 ? "blue.400" : "transparent"}
                      />
                    </WrapItem>
                  );
                })}
              </Wrap>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                handleUpdateChoice!(questionId, choiceId, previewImageUrl ?? "", false);
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function filterImages(imageData: CustomChoice[], selectedTags: string[]) {
  if (selectedTags.length === 0) {
    return imageData;
  }

  return imageData.filter((image) => intersection(image.tags.map((tag) => tag.name), selectedTags).length !== 0);
}

export default SelectImageModal;
