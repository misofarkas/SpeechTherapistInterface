import { useEffect, useState } from "react";
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
import { BasicChoice } from "../types/commonTypes";

type ImageModalArgs = {
  selectedImageUrl: string | undefined;
  handleUpdateChoice: ((a: string, b: string, c: string | undefined, d: string | undefined) => void) | undefined;
  boxSize: string;
  imageData: BasicChoice[];
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

  const selectedImage = imageData.find((image) => image.image === selectedImageUrl);
  const imageSelected = selectedImage !== undefined;

  console.log("preview:", previewImageUrl);
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
              src={selectedImage.image}
              alt={selectedImage.text}
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
                {imageData.map((image) => {
                  return (
                    <WrapItem key={image.id}>
                      <Image
                        src={image.image}
                        alt={image.text}
                        objectFit="cover"
                        boxSize="7rem"
                        onClick={() => setPreviewImageUrl(image.image)}
                        borderRadius="lg"
                        cursor="pointer"
                        border="2px"
                        borderColor={previewImageUrl === image.image ? "blue.400" : "transparent"}
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
                handleUpdateChoice!(questionId, choiceId, undefined, previewImageUrl ?? "");
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

export default SelectImageModal;
