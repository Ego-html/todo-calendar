import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-day-cell',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './day-cell.component.html',
  styleUrl: './day-cell.component.css'
})
export class DayCellComponent {

  @Input() dayDate: string = '';
  @Input() taskCount: number = 0;
  @Output() dayClick = new EventEmitter<string>();

  get dayNumber() : number {
    return new Date(this.dayDate).getDate()
  }

  onDayClick() {
    this.dayClick.emit(this.dayDate)
  }
}
