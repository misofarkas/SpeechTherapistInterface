import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        size: "sm",
      },
    },
    Container: {
      baseStyle: {
        maxW: "150ch",
        px: "8%",
        mt: "2rem",
      },
    },
    Heading: {
      defaultProps: {
        size: "md",
      },
    },
  },
});
export default theme;
