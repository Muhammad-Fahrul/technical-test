import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { EMPTY, Observable, catchError, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="note">
      <form [formGroup]="noteForm" class="form-add-note">
        <h1>Detail Note</h1>
        <div class="inputs">
          <label for="title">Title</label>
          <input
            name="title"
            type="text"
            required="required"
            formControlName="title"
          />
          <label for="desc">Desc</label>
          <input
            name="desc"
            type="text"
            required="required"
            formControlName="desc"
          />
          <div class="btns">
            <button (click)="updateNote()" class="enter">Update</button>
            <button (click)="deleteNote()" class="enter">Delete</button>
          </div>
        </div>
      </form>
      <a class="detail" [routerLink]="['/notes']">
        <span>Notes</span>
        <i class="fa-solid fa-angles-right"></i>
      </a>
    </div>
  `,
  styleUrl: './note.component.css',
})
export class NoteComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  noteId = 0;
  note!: Note;
  success: string = '';

  constructor(
    private noteService: NoteService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.noteId = Number(this.route.snapshot.params['id']);
  }

  noteForm: FormGroup = this.formBuilder.group({
    title: [''],
    desc: [''],
  });

  ngOnInit() {
    this.noteService.getNoteById(this.noteId).subscribe((note) => {
      this.note = note;
      this.noteForm.patchValue({
        title: this.note.title,
        desc: this.note.desc,
      });
    });
  }

  updateNote() {
    if (this.noteForm.valid) {
      this.noteService.update(this.noteId, this.noteForm.value).subscribe({
        next: (response) => {
          this.success = response.message;
          alert(this.success);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
    }
  }

  deleteNote() {
    this.noteService.delete(this.noteId).subscribe({
      next: (response) => {
        this.router.navigate(['/notes']);
        this.success = response.message;
        alert(this.success);
      },
    });
  }
}
