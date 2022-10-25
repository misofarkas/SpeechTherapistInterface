import { Patient } from "../types/commonTypes";
import axios from "./axios";

export async function getPatients({auth, linkedOnly = false} : {auth: any; linkedOnly?: boolean}) {
    return await axios.get<Patient[]>(`/user/list/patients/?linked_only=${linkedOnly ? 1 : 0}`, { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export async function getPatient({auth, id} : {auth: any; id: string}) {
    return await axios.get<Patient>(`/user/list/patient/${id}/`, { headers: { Authorization: `Token ${auth?.accessToken}` } });
}