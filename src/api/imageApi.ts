import { BasicChoice, Tag } from "../types/commonTypes";
import axios from "./axios";

export async function getImages({ auth }: { auth: any }) {
  return await axios.get<BasicChoice[]>("/task/basic_choices/", {
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
  data.append("image", image);
  data.append("text", imageText);
  data.append("tags", JSON.stringify([]));
  
  return await axios.post("/task/basic_choices/", data, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}
