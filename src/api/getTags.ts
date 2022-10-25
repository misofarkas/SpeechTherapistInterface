import { Tag } from "../types/commonTypes";
import axios from "./axios";

async function getTags({ auth }: { auth: any }) {
  return await axios.get<Tag[]>("/task/tags/", { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export default getTags;
