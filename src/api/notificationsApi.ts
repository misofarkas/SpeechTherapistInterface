import { LinkRequest } from "../types/commonTypes";
import axios from "./axios";

export async function getLinkRequests({ auth }: { auth: any }) {
  return await axios.get<LinkRequest[]>("/user/therapist/waiting-to-link/", {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}

export async function acceptLinkRequest({ auth, id }: { auth: any; id: string }) {
  return await axios.patch(
    `/user/therapist/link/${id}/accept/`,
    {},
    {
      headers: { Authorization: `Token ${auth?.accessToken}` },
    }
  );
}

export async function rejectLinkRequest({ auth, id }: { auth: any; id: string }) {
  return await axios.patch(
    `/user/therapist/link/${id}/reject/`,
    {},
    {
      headers: { Authorization: `Token ${auth?.accessToken}` },
    }
  );
}
