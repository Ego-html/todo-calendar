import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Input() selectedDate: string = '';
  @Output() close = new EventEmitter<void>()

  constructor(private TaskService: TaskService) {
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
    this.close.emit();
  }
}
