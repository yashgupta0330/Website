import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-internal-loader',
  templateUrl: './internal-loader.component.html',
  styleUrls: ['./internal-loader.component.scss']
})
export class InternalLoaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription: Subscription = new Subscription();

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.internalLoader$.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
