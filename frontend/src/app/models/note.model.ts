export interface Note {
  id: number;
  title: string;
  desc: string;
}

export interface ResponseNote {
  notes: Note[];
  currentPage: number;
  totalPages: number;
}
