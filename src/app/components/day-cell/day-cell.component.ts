import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
  @Input() year: number = 0;
  @Input() month: number = 0;
  @Input() day: number = 0;
  @Input() tasksCount: number = 0;

  constructor(private router: Router) {
  }

  get dayNumber(): number {
    return new Date(this.dayDate).getDate()
  }

  onDayClick() {
    const monthStr = (this.month + 1).toString().padStart(2, '0');
    const dayStr = this.day.toString().padStart(2, '0');
    const fullDate = `${this.year}-${monthStr}-${dayStr}`;

    this.router.navigate(['/calendar', fullDate])
    // this.modalService.openModal(this.dayDate);
  }
}
