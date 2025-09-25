import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() {
  }

  private modalStateSubject = new Subject<{ isOpen: boolean, date: string }>();
  public modal$ = this.modalStateSubject.asObservable();

  setModalStatus(open: boolean, date: string = '') {
    this.modalStateSubject.next({
      isOpen: open,
      date: date
    })
  }

  openModal(date: string) {
    this.setModalStatus(true, date)
  }

  closeModal() {
    this.setModalStatus(false)
  }
}



