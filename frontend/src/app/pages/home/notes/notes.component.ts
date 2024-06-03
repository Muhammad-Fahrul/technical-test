import { Component, Input, Output } from '@angular/core';
import { Note, ResponseNote } from '../../../models/note.model';
import { NoteService } from '../../../services/note.service';
import { EMPTY, catchError, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NoteComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  @Input() title!: string;
  notes: Note[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  errorMessage: string = '';

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchNotes(this.title, 1);
  }

  fetchNotes(title: string = '', page: number) {
    const queryParams = { title, page }; // Misalnya kita menetapkan page ke 1
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // Menggabungkan query parameters dengan yang sudah ada
    });
    this.noteService
      .getNotes(title, page)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.errorMessage = 'Error fetching notes';
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.setResponse(response);
      });
  }

  loadMore() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchNotes(this.title, this.currentPage);
    }
  }

  loadLess() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchNotes(this.title, this.currentPage);
    }
  }

  private setResponse(response: ResponseNote) {
    this.notes = response.notes;
    this.currentPage = response.currentPage;
    this.totalPages = response.totalPages;
  }
}
