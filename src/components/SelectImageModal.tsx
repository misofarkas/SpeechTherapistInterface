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
  Tag,
  Stack,
  TagLabel,
  Wrap,
  WrapItem,
  Image,
  Center,
  Text,
} from "@chakra-ui/react";
import { TagData } from "../data/TagData";
import { ImageData } from "../data/ImageData";
import { useTagContext } from "../contexts/TagContext";

type ImageModalArgs = {
  selectedImageId: string | undefined;
  setSelectedImageId: (id: string, index: number) => void;
  imageIndex: number | undefined
  boxSize: string
};

function SelectImageModal({
  selectedImageId,
  setSelectedImageId,
  imageIndex,
  boxSize
}: ImageModalArgs) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedTagIds, toggleTag } = useTagContext();
  const [previewImageId, setPreviewImageId] = useState<string | undefined>();

  const selectedImage = ImageData.find((image) => image.id === selectedImageId);
  const imageSelected = selectedImage !== undefined;

  function isSelected(id: string) {
    return selectedTagIds.includes(id);
  }

  return (
    <>
      <Box onClick={onOpen}>
        {!imageSelected && (
          <Center boxSize={boxSize}>
            <Text>Select Image</Text>
          </Center>
        )}
        {imageSelected && (
          <Box>
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
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
              <Stack mr="5">
                {TagData.map((tag) => {
                  return (
                    <Tag
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      transition="0.2s"
                      _hover={{
                        bg: isSelected(tag.id) ? "green.300" : "gray.200",
                      }}
                      cursor="pointer"
                      bg={isSelected(tag.id) ? "green.200" : "gray.100"}
                    >
                      <TagLabel mx="auto">{tag.name}</TagLabel>
                    </Tag>
                  );
                })}
              </Stack>
              <Wrap w="full" spacing="0.2rem">
                {ImageData.map((image) => {
                  return (
                    <WrapItem key={image.id}>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        objectFit="cover"
                        boxSize="7rem"
                        onClick={() => setPreviewImageId(image.id)}
                        borderRadius="lg"
                        cursor="pointer"
                        border="2px"
                        borderColor={
                          previewImageId === image.id
                            ? "blue.400"
                            : "transparent"
                        }
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
                setSelectedImageId(previewImageId ?? "", imageIndex ?? -1);
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
