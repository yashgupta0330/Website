import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Show loader for HTTP requests
    this.loaderService.showInternalLoader();
    // Show external loader for initial app load (first requests only)
    this.loaderService.showExternalLoaderRequest();

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Request completed successfully
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle error but still hide loader
        return throwError(() => error);
      }),
      finalize(() => {
        // Hide loader when request completes (success or error)
        this.loaderService.hideInternalLoader();
        this.loaderService.hideExternalLoaderRequest();
      })
    );
  }
}
