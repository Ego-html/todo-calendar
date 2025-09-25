import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {ModalService} from "../../services/modal.service";

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

  constructor(private modalService: ModalService) {
  }

  get dayNumber(): number {
    return new Date(this.dayDate).getDate()
  }

  onDayClick() {
    this.modalService.openModal(this.dayDate);
  }
}
