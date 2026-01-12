import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CalendarViewComponent} from "./components/calendar-view/calendar-view.component";
import {TaskModalComponent} from "./components/task-modal/task-modal.component";
import {NgIf} from "@angular/common";
import {ModalState} from "./models/modal-state";
import {of} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarViewComponent, TaskModalComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Todo-calendar';
}

