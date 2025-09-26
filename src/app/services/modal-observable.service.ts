import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ModalState} from "../models/modal-state";

@Injectable({
  providedIn: 'root'
})
export class ModalObservableService {

  constructor() {
  }

  private currentState: ModalState = {isOpen: false, date: ''};

  modalState$ = new Observable<ModalState>((observer) => {
    observer.next({
      isOpen: this.currentState.isOpen,
      date: this.currentState.date,
    })
  })

  openModal(date: string) {
    this.currentState.isOpen = true;
    this.currentState.date = date
  }

  closeModal() {
    this.currentState.isOpen = false;
    this.currentState.date = '';
  }
}
