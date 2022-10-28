import { Meeting } from "../types/commonTypes";
import axios from "./axios";

export async function getMeetings({ auth }: { auth: any }) {
  return await axios.get<Meeting[]>("/meeting/meetings/", { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export async function postMeetings({ auth, meeting }: { auth: any; meeting: Meeting }) {
    return await axios.post("/meeting/meetings/", meeting, { headers: { Authorization: `Token ${auth?.accessToken}` } });
  }