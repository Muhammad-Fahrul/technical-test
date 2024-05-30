import { Component } from '@angular/core';
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
import { HttpErrorResponse } from '@angular/common/http';
import {
  EMPTY,
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NoteComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  display: boolean = false;
  notes$!: Observable<Note[]>;
  errorMessage: string = '';
  currentPage!: number;
  totalPages!: number;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  noteForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    desc: ['', Validators.required],
  });

  searchForm: FormGroup = this.formBuilder.group({
    title: [''],
  });

  ngOnInit() {
    this.fetchNotes(); // Setelah mendapatkan currentPage, panggil fetchNotes untuk mendapatkan catatan sesuai dengan halaman saat ini

    this.searchForm
      .get('title')!
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { title: query, page: 1 },
          queryParamsHandling: 'merge',
        });
      });
  }

  fetchNotes() {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          const query = params['title'] || '';
          const page = params['page'] || 1;
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

  toggleDisplay() {
    this.display = !this.display;
  }

  addNote(e: Event) {
    e.preventDefault();
    if (this.noteForm.valid) {
      this.noteService.add(this.noteForm.value).subscribe({
        next: () => {
          this.display = false;
          this.noteForm.reset();
          this.fetchNotes();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
    }
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
  }
}
