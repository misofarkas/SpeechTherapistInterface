import axios from "./axios";

async function getImages({
  auth,
  setIsLoading,
  setImageError,
}: {
  auth: any;
  setIsLoading: (a: boolean) => void;
  setImageError: (a: string) => void;
}) {
  const BASIC_CHOICE_URL = "/task/basic_choices/";
  setIsLoading(true);
  let imageData;
  try {
    imageData = await axios.get(BASIC_CHOICE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth?.accessToken}`,
      },
      withCredentials: false,
    });
  } catch (error) {
    console.error(error);
    setImageError(String(error));
  }
  setIsLoading(false);
  return imageData?.data;
}

export default getImages;
