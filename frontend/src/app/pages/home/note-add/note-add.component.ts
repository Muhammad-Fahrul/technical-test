import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoteService } from '../../../services/note.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClickoutsiteDirective } from '../../../directives/clickoutsite.directive';

@Component({
  selector: 'app-note-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClickoutsiteDirective],
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css'],
})
export class NoteAddComponent {
  @Output() noteAdded = new EventEmitter<void>();

  display: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) {}

  noteForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    desc: ['', Validators.required],
  });

  toggleDisplay() {
    console.log(this.display);
    this.display = true;
  }

  addNote() {
    if (this.noteForm.valid) {
      this.noteService.add(this.noteForm.value).subscribe({
        next: () => {
          this.display = false;
          this.noteForm.reset();
          this.noteAdded.emit();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
    }
  }
}
