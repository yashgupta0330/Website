
  import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private stateSubject = new BehaviorSubject<any>({});
  public state$ = this.stateSubject.asObservable();

  constructor() { }

  setState(newState: any) {
    this.stateSubject.next({ ...this.stateSubject.value, ...newState });
  }

  getState() {
    return this.stateSubject.value;
  }
}

