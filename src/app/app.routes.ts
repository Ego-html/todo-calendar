import {Routes} from '@angular/router';
import {CalendarViewComponent} from "./components/calendar-view/calendar-view.component";
import {TaskModalComponent} from "./components/task-modal/task-modal.component";

export const routes: Routes = [
  {
    path: 'calendar/:dateStr',
    component: CalendarViewComponent,
  },
  {path: '', redirectTo: 'calendar/2025-09', pathMatch: 'full'}
];


