import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormGroup, FormControl, FormArray} from '@angular/forms';
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task.model";
import {NgForOf, NgIf} from "@angular/common";
import {BehaviorSubject, catchError, combineLatest, filter, finalize, map, Subject, takeUntil, tap} from "rxjs";
import {of} from "rxjs";
import {throwError} from 'rxjs';
import {TasksForDateComponent} from "../tasks-for-date/tasks-for-date.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TasksForDateComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Input() selectedDate: string = '';
  @Input() title: string = '';
  inputValue: string = '';
  tasksDayStorage: Task[] = [];
  tasksForDate: Task[] = [];
  quantity: number | null = null;
  myReactiveForm = new FormGroup({
    name: new FormControl('',{nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
    quantity: new FormControl<number>(1, {nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(5)]})
  });

  constructor(private taskService: TaskService, private router: Router) {}

  destroy$ = new Subject<void>();

  ngOnInit() {

    document.addEventListener('keydown', this.handleKeyPress);
    // combineLatest
    // combineLatest([this.taskService.state$, this.selectedDate$]).pipe(finalize(() => console.log('Modal window is closed')), map(([state, date]) => state[date] ?? []), takeUntil(this.destroy$)).subscribe(task => this.tasksForDate = task);
    //
    this.taskService.state$.pipe(finalize(() => console.log('Modal window is closed')), map((state) => state[this.selectedDate]), takeUntil(this.destroy$)).subscribe({
      next: (state) => this.tasksForDate = state,
      complete: () => console.log('Observable has completed')
    });
    //TASK 1 — Create a fake task stream
    // Observable emits
    const task$ = of({
      id: crypto.randomUUID(),
      text: 'Learning Angular',
      isCompleted: false,
      date: this.selectedDate
    })
    // tap: observe without changing
    // add finalize
    task$.pipe(finalize(() => console.log('finalize called')), tap(value => console.log('before map: ', value)), map(value => ({
      text: value.text,
      isCompleted: value.isCompleted
    }))).subscribe(result => console.log('after map: ', result));
    // filter
    task$.pipe(tap(value => console.log('before filter: ', value)), filter(value => value.isCompleted === false)).subscribe(result => console.log('after filter: ', result));

    //catchError
    // const errorTask$ = throwError(() => new Error('Task loading failed'));
    //
    // errorTask$
    //   .pipe(
    //     catchError(error => {
    //       console.log('Caught error:', error.message);
    //       return of({
    //         text: 'Fallback task',
    //         isCompleted: false
    //       });
    //     }),
    //     finalize(() => console.log('finalize called'))
    //   )
    //   .subscribe(result => console.log('subscribe:', result));

    //combineLatest
    const taskRxJS$ = of({text: 'Learn RxJS', isCompleted: false});
    const state$ = of('draft');

    combineLatest([taskRxJS$, state$]).pipe(tap((value) => console.log('Default observable: ', value)), map(([task, status]) => ({
      ...task,
      isCompleted: status
    }))).subscribe(task => console.log(task))
  }

  onCheckBoxChange(task: { date: string; taskId: string }) {
    this.taskService.toggleTaskCompletion(task.date, task.taskId);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyPress)
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges() {
    if (this.selectedDate) {
      this.tasksDayStorage = [...this.taskService.getTasksForDate(this.selectedDate)];
    }
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
    this.router.navigate(['/calendar', '2025-09']);
  }

  addTask() {
    if (this.myReactiveForm.invalid) return;

    const { name }  = this.myReactiveForm.getRawValue();
    this.taskService.addTasks(this.selectedDate, name);
  }

  deleteTask(task: { date: string; taskId: string }) {
    this.taskService.deleteTask(task.date, task.taskId)
  }
}
