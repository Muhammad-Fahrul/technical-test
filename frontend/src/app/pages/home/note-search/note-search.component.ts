import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.css'],
})
export class NoteSearchComponent {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.formBuilder.group({
      title: [''],
    });
  }

  ngOnInit() {
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
}
