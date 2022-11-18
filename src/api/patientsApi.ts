import { Patient } from "../types/commonTypes";
import axios from "./axios";

export async function getPatients({ auth, linkedOnly = true }: { auth: any; linkedOnly?: boolean }) {
  return await axios.get<Patient[]>(`/user/list/patients/?linked_only=${linkedOnly ? 1 : 0}`, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}

export async function getPatient({ auth, id }: { auth: any; id: string }) {
  return await axios.get<Patient>(`/user/list/patient/${id}/`, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}

export async function postDiagnosts({ auth, text, id }: { auth: any; text: string; id: string }) {
  // todo, waiting for API
}

export async function postNotes({ auth, notes, id }: { auth: any; notes: string; id: string }) {
  return await axios.patch(`/user/therapist/${id}/note/`, {notes}, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}

export async function unlinkPatient({ auth, id }: { auth: any; id: string }) {
  return await axios.patch(
    `/user/therapist/link/${id}/unlink/`,
    { assigned_task: null },
    {
      headers: { Authorization: `Token ${auth?.accessToken}` },
    }
  );
}
