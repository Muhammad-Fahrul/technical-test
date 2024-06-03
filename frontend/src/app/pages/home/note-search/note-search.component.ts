import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fromEvent } from 'rxjs';
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
  @ViewChild('searchInput') searchInput!: ElementRef;

  searchTitle: string = '';

  constructor() {}

  // Fungsi debounce diimplementasikan dalam komponen
  debounce(callback: (...args: any[]) => void, delay: number) {
    let timeoutId: any;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  ngAfterViewInit() {
    const debouncedUpdateSearch = this.debounce(
      this.updateSearch.bind(this),
      300
    );
    fromEvent(this.searchInput.nativeElement, 'input').subscribe(() => {
      this.searchTitle = this.searchInput.nativeElement.value;
      debouncedUpdateSearch(this.searchTitle);
    });
  }

  updateSearch(title: string) {
    this.titleChange.emit(title);
  }
}
