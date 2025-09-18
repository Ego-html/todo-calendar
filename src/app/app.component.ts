import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CalendarViewComponent} from "./components/calendar-view/calendar-view.component";
import {TaskModalComponent} from "./components/task-modal/task-modal.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarViewComponent, TaskModalComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-calendar';

  isModalOpen = false;
  selectedDate = '';

  openModal(date: string) {
    this.selectedDate = date;
    this.isModalOpen = true;
    console.log('In modal window ', this.selectedDate);
  }

  closeModal() {
    this.isModalOpen = false;
  }
}

