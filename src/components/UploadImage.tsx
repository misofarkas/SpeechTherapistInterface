import { Button, FormLabel, Input, Stack, Image, Flex, Center, Text, useMediaQuery, useToast } from "@chakra-ui/react";
import { useState, useRef } from "react";
import axios from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

function UploadImage() {
  const UPLOAD_IMAGE_URL = "/task/basic_choices/";
  const [image, setImage] = useState("");
  const [imageText, setImageText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const toast = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const { auth } = useAuth();

  function handleImageSelection(e: any) {
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
      const data = new FormData();
      data.append("image", image);
      data.append("text", imageText);
      data.append("tags", JSON.stringify([]));
      setLoading(true);
      const res = await axios.post(UPLOAD_IMAGE_URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${auth?.accessToken}`,
        },
        withCredentials: false,
      });
      setLoading(false);
      setImage("");
      setImageText("");
      toast({
        title: "Success",
        description: "Image has been uploaded",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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

        <Button onClick={postFile} isLoading={loading} loadingText="Submitting">
          Upload
        </Button>
      </Stack>
    </Flex>
  );
}

export default UploadImage;
