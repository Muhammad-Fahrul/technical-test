import { Injectable } from '@angular/core';
import { Note, ResponseNote } from '../models/note.model';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private apiService: ApiService) {}

  getNotes(query: string = '', page: number): Observable<ResponseNote> {
    return this.apiService.get(`/notes?title=${query}&page=${page}`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.apiService.get(`/notes/${id}`);
  }

  add(payload: { title: string; desc: string }) {
    return this.apiService.post('/notes', payload);
  }

  update(id: number, payload: { title: string; desc: string }) {
    return this.apiService.put(`/notes/${id}`, payload);
  }

  delete(id: number) {
    return this.apiService.delete(`/notes/${id}`);
  }
}
