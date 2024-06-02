import { Component } from '@angular/core';
import { Note } from '../../../models/note.model';
import { NoteService } from '../../../services/note.service';
import { Observable, EMPTY, of, catchError, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NoteComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  notes$!: Observable<Note[]>;
  errorMessage: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.fetchNotes();
    });
  }

  fetchNotes() {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          const query = params['title'] || '';
          const page = params['page'] || this.currentPage || 1;
          return this.noteService.getNotes(query, page).pipe(
            catchError((error) => {
              console.error(error);
              this.errorMessage = 'Error fetching notes';
              return EMPTY;
            })
          );
        })
      )
      .subscribe((response) => {
        this.notes$ = of(response.notes);
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
      });
  }

  loadMore() {
    this.currentPage++;
    this.updateQueryParam();
  }

  loadLess() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateQueryParam();
    }
  }

  updateQueryParam() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });
    this.fetchNotes();
  }
}
