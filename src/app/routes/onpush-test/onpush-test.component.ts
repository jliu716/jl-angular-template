import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { concat, debounceTime, delay, of, Subject } from 'rxjs';

@Component({
  selector: 'app-onpush-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onpush-test.component.html',
  styleUrl: './onpush-test.component.less',
  // changeDetection: ChangeDetectionStrategy.Default
})
export class OnpushTestComponent {
  numbers: number[] = [];
  subject$ = new Subject<number>();
  shouldDetectChanges = false;
  constructor(private cdr: ChangeDetectorRef) {
  }

  doNothing() {
    console.log('do nothing');
  }


  ngOnInit() {
    this.subject$.pipe(debounceTime(1000)).subscribe(n => {
      this.numbers.push(n);
      if (this.shouldDetectChanges) this.cdr.detectChanges();
    });
  }

  fire(times: number) {
    let numbers = Array.from({ length: times }, (_, i) => i);

    concat(
      ...numbers.map(n => of(n).pipe(delay(1000)))
    ).subscribe(n => {
      this.subject$.next(times - n);
    });
  }
}
