import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalObservableService} from "../../services/modal-observable.service";

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Input() selectedDate: string = '';
  @Input() title: string = '';

  constructor(private modalObservableService: ModalObservableService) {
  }

  ngOnInit() {
    document.addEventListener('keydown', this.handleKeyPress)
    if (this.selectedDate) {
    }
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  clickOnOverlay(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  closeModal() {
    this.modalObservableService.closeModal();
  }
}
