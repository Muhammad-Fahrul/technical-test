import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.css'],
})
export class NoteSearchComponent {
  @Input() title!: string;
  @Output() titleChange = new EventEmitter<string>();
  private titleSubject: Subject<string> = new Subject<string>();
  private subscription: any;

  constructor() {}

  ngOnInit() {
    this.subscription = this.titleSubject
      .pipe(debounceTime(300)) // Menunggu selama 300ms
      .subscribe((newTitle: string) => {
        this.titleChange.emit(newTitle);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Membersihkan subscription saat komponen dihancurkan
  }

  onTitleChange(newTitle: string) {
    this.titleSubject.next(newTitle); // Memancarkan nilai baru ke Subject
  }
}
