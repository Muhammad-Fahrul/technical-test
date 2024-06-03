import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteSearchComponent } from './note-search/note-search.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { NotesComponent } from './notes/notes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  title: any;

  onNoteAdded() {
    this.notesComponent.fetchNotes('', this.notesComponent.currentPage);
  }

  onSearchNotes() {
    this.notesComponent.fetchNotes(this.title, this.notesComponent.currentPage);
  }
}
