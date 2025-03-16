import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { concat, debounceTime, delay, of, Subject } from 'rxjs';

@Component({
  selector: 'app-default-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './default-test.component.html',
  styleUrl: './default-test.component.less',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DefaultTestComponent {
  @Input()
  numbers: number[] = [];

  subject$ = new Subject<number>();
  
  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subject$.pipe(debounceTime(1000)).subscribe(n => {
      this.numbers.push(n);
      console.log('numbers = ', this.numbers);
    });
  }

  fire(times: number) {
    this.numbers = [];

    this.subject$.next(times); times--;

    let numbers = Array.from({ length: times }, (_, i) => i);
    concat(
      ...numbers.map(n => of(n).pipe(delay(1000)))
    ).subscribe(n => {
      this.subject$.next(times - n);
    });
  }
}
