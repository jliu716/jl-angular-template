import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnpushTestComponent } from '../onpush-test/onpush-test.component';
import { DefaultTestComponent } from '../default-test/default-test.component';
import { concat, debounceTime, delay, of, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, OnpushTestComponent, DefaultTestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  numbers: number[] = [];

  subject$ = new Subject<number>();

  ngOnInit() {
    this.subject$.pipe(debounceTime(1000)).subscribe(n => {
      this.numbers.push(n);
      console.log('numbers = ', this.numbers);
    });
  }

  fire(times: number) {
    this.subject$.next(times); times--;

    let numbers = Array.from({ length: times }, (_, i) => i);

    concat(
      ...numbers.map(n => of(n).pipe(delay(1000)))
    ).subscribe(n => {
      this.subject$.next(times - n);
    });
  }
}
