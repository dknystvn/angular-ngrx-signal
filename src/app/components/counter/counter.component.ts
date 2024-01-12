import {Component, inject, Signal} from '@angular/core';
import {CounterStore} from "../../store/counter.store";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  providers: [CounterStore]
})
export class CounterComponent {
readonly counterStore = inject(CounterStore);
counter: Signal<number> = this.counterStore.count;
}
