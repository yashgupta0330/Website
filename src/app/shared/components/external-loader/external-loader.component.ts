import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-external-loader',
  templateUrl: './external-loader.component.html',
  styleUrls: ['./external-loader.component.scss']
})
export class ExternalLoaderComponent implements OnInit, OnDestroy {
  isLoading = true;
  private subscription: Subscription = new Subscription();

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.externalLoader$.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
