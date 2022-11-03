import { CustomChoice, Tag } from "../types/commonTypes";
import axios from "./axios";

export async function getImages({ auth }: { auth: any }) {
  return await axios.get<CustomChoice[]>("/task/basic_choices/", {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}

export async function postImage({
  auth,
  image,
  imageText,
  tags,
}: {
  auth: any;
  image: any;
  imageText: string;
  tags: Tag[];
}) {
  const data = new FormData();
  data.append("data1", imageText);
  data.append("data2", image);
  data.append("tags", JSON.stringify([]));
  
  return await axios.post("/task/basic_choices/", data, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}
