import { Button, FormLabel, Input, Stack, Image, Flex, Center, Text, useMediaQuery, useToast } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { postImage } from "../api/imageApi";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "react-query";
import UploadImage from "./UploadImage";

// Component for previewing and uploading images
function UploadImageChoice() {
  const [image, setImage] = useState("");
  const [imageText, setImageText] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const toast = useToast();
  const { auth } = useAuth();

  // mutation for uploading image
  const { mutate: uploadImageMutation, isLoading } = useMutation(
    () => postImage({ auth, image, imageText, tags: [] }),
    {
      onSuccess: () => {
        setImage("");
        setImageText("");
        toast({
          title: "Success",
          description: "Image has been uploaded",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "There was an error when uploading your image",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  function handleImageSelection(e: any) {
    const file = e.target.files[0];
    setImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  }

  // function for handling the posting of an image
  function postFile() {
    if (image === undefined || image === "") {
      toast({
        title: "Error",
        description: "No image has been selected",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (imageText === "") {
      toast({
        title: "Error",
        description: "Image Name cannot be empty",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      uploadImageMutation();
    }
  }

  return (
    <Flex gap={isLargerThan768 ? "50px" : "20px"} direction={isLargerThan768 ? "row" : "column"}>

      {/* Image prpeview */}
      {image !== "" ? (
        <Image mt="3" objectFit="cover" boxSize="200px" borderRadius="lg" src={imagePreviewUrl} alt="no image found" />
      ) : (
        <Center boxSize="200px" mt="3" borderRadius="lg" borderWidth="1px">
          <Text>Image Preview</Text>
        </Center>
      )}


      <Stack minW="300px" maxW="400px">
        {/* Upload image from device */}
        <UploadImage handleImageSelection={handleImageSelection}>
          <Button w="full">Select Image</Button>
        </UploadImage>

        {/* Image name input */}
        <FormLabel>Image Name</FormLabel>
        <Input value={imageText} onChange={(e) => setImageText(e.target.value)}></Input>

        {/* Upload image button */}
        <Button onClick={postFile} isLoading={isLoading} loadingText="Submitting">
          Upload
        </Button>
      </Stack>
    </Flex>
  );
}

export default UploadImageChoice;
