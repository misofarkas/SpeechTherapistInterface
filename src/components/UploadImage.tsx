import { Button, FormLabel, Input, Stack, Image, Flex, Center, Text, useMediaQuery, useToast } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { postImage } from "../api/imageApi";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "react-query";

function UploadImage() {
  const [image, setImage] = useState("");
  const [imageText, setImageText] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const toast = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const { auth } = useAuth();


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
    console.log(e)
    const file = e.target.files[0];
    setImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  }

  async function postFile(e: any) {
    console.log(e.target.files);
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
      {image !== "" ? (
        <Image mt="3" objectFit="cover" boxSize="200px" borderRadius="lg" src={imagePreviewUrl} alt="no image found" />
      ) : (
        <Center boxSize="200px" mt="3" borderRadius="lg" borderWidth="1px">
          <Text>Image Preview</Text>
        </Center>
      )}

      <Stack minW="300px" maxW="400px">
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleImageSelection}
        ></input>
        <Button onClick={() => fileInput.current?.click()}>Select Image</Button>
        <FormLabel>Image Name</FormLabel>
        <Input value={imageText} onChange={(e) => setImageText(e.target.value)}></Input>

        <Button onClick={postFile} isLoading={isLoading} loadingText="Submitting">
          Upload
        </Button>
      </Stack>
    </Flex>
  );
}

export default UploadImage;
