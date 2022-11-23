import { Task } from "./taskTypes";

export type Auth = {
  email: string;
  password: string;
  accessToken: string;
};

export type Tag = {
  id: string;
  name: string;
  user: string;
};

export type Patient = {
  id: string;
  email: string;
  name: string;
  image: string;
  is_therapist: boolean;
  my_meetings: string;
  assigned_tasks: Task[];
  assigned_to: string;
  assignment_active: boolean;
  notes: string;
};


export type User = {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
  image?: string | null;
  phone?: string | null;
  location?: string | null;
  country?: string | null;
  company?: string | null;
  bio?: string | null;
};

export type LinkRequest = {
  id: string;
  email: string;
  name: string;
  image: string;
  assigned_to: number;
  assigment_active: boolean;
};

