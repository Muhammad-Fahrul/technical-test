import { Component, ViewChild } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';
import { EMPTY, Observable, catchError, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteSearchComponent } from './note-search/note-search.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { NotesComponent } from './notes/notes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NoteComponent,
    NoteSearchComponent,
    NoteAddComponent,
    NotesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild(NotesComponent) notesComponent!: NotesComponent;

  constructor() {}

  onNoteAdded() {
    this.notesComponent.fetchNotes();
  }
}
