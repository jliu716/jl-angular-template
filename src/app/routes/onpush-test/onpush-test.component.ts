import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { concat, debounceTime, delay, of, Subject } from 'rxjs';

@Component({
  selector: 'app-onpush-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onpush-test.component.html',
  styleUrl: './onpush-test.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnpushTestComponent implements OnChanges {

  @Input()
  numbers: number[] = [];

  subject$ = new Subject<number>();

  constructor(private cdr: ChangeDetectorRef) {

  }

  doNothing() {
    console.log('do nothing');
  }


  ngOnInit() {
    this.subject$.pipe(debounceTime(1000)).subscribe(n => {
      this.numbers.push(n);
      // this.cdr.detectChanges();
      console.log('numbers = ', this.numbers);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('numbers' in changes) {
      this.cdr.detectChanges(); // does nothing
    }
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
