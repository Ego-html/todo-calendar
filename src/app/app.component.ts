import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CalendarViewComponent} from "./components/calendar-view/calendar-view.component";
import {TaskModalComponent} from "./components/task-modal/task-modal.component";
import {NgIf} from "@angular/common";
import {ModalService} from "./services/modal.service";
import {ModalState} from "./models/modal-state";
import {ModalObservableService} from "./services/modal-observable.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarViewComponent, TaskModalComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Todo-calendar';

  constructor(private modalObservableService: ModalObservableService) {
  }

  isModalOpen = false;
  selectedDate = '';

  ngOnInit() {
    this.modalObservableService.modalState$.subscribe((value: ModalState) => {
      this.isModalOpen = value.isOpen
      this.selectedDate = value.date;

    })
  }

  closeModal() {
    this.isModalOpen = false;
  }
}

