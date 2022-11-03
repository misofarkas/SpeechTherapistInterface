import { Box } from "@chakra-ui/react";
import { useRef } from "react";

function UploadImage({
  children,
  handleImageSelection,
}: {
  children: React.ReactNode;
  handleImageSelection: (e: any) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <Box>
      <input style={{ display: "none" }} type="file" accept="image/*" ref={fileInput} onChange={handleImageSelection} />
      <Box onClick={() => fileInput.current?.click()}>{children}</Box>
    </Box>
  );
}

export default UploadImage;
