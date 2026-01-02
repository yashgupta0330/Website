import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private internalLoaderSubject = new BehaviorSubject<boolean>(false);
  private externalLoaderSubject = new BehaviorSubject<boolean>(true);
  private requestCount = 0;
  private externalRequestCount = 0;
  private externalLoaderActive = true;

  public internalLoader$: Observable<boolean> = this.internalLoaderSubject.asObservable();
  public externalLoader$: Observable<boolean> = this.externalLoaderSubject.asObservable();

  constructor() { }

  // Internal loader methods (for HTTP requests)
  showInternalLoader(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.internalLoaderSubject.next(true);
    }
  }

  hideInternalLoader(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.internalLoaderSubject.next(false);
    }
  }

  // Generic external loader logic (like internal loader, but only for initial load)
  showExternalLoaderRequest(): void {
    if (!this.externalLoaderActive) return;
    this.externalRequestCount++;
    if (this.externalRequestCount === 1) {
      this.externalLoaderSubject.next(true);
    }
  }

  hideExternalLoaderRequest(): void {
    if (!this.externalLoaderActive) return;
    this.externalRequestCount--;
    if (this.externalRequestCount <= 0) {
      this.externalRequestCount = 0;
      this.externalLoaderSubject.next(false);
      this.externalLoaderActive = false; // Only for initial load
    }
  }

  // External loader methods (for initial app load)
  showExternalLoader(): void {
    this.externalLoaderSubject.next(true);
    this.externalLoaderActive = true;
  }

  hideExternalLoader(): void {
    this.externalLoaderSubject.next(false);
    this.externalLoaderActive = false;
  }

  // Get current state
  isInternalLoading(): boolean {
    return this.internalLoaderSubject.value;
  }

  isExternalLoading(): boolean {
    return this.externalLoaderSubject.value;
  }
}
