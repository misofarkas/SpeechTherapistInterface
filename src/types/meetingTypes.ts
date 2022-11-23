export type Meeting = {
  id?: string;
  name: string;
  created_by: number;
  assigned_patient: string;
  start_time: string;
  end_time: string;
};

export type Event = {
  id: string;
  title: string;
  assignedPatient: string;
  start: Date;
  end: Date;
};

export type DateRange = {
  start: Date;
  end: Date;
};
