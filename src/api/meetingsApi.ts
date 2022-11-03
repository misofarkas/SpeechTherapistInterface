import { Meeting } from "../types/commonTypes";
import axios from "./axios";

export async function getMeetings({ auth }: { auth: any }) {
  return await axios.get<Meeting[]>("/meeting/meetings/", { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export async function postMeeting({ auth, meeting }: { auth: any; meeting: Meeting }) {
  return await axios.post("/meeting/meetings/", meeting, { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export async function deleteMeeting({ auth, id }: { auth: any; id: string }) {
  return await axios.delete(`/meeting/meetings/${id}/`, { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export async function updateMeeting({ auth, meeting, id }: { auth: any; meeting: Meeting; id: string }) {
  return await axios.put(`/meeting/meetings/${id}/`, meeting, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}
