import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RootComponent } from './root/root.component';
import { MainComponent } from './main/main.component';
import { DigitalMarketingComponent } from './digital-marketing/digital-marketing.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CommonModule, DatePipe, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { QueriesComponent } from './queries/queries.component';
import { FilterPipe } from './pipes/filter.pipe';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { DesignComponent } from './Services/design/design.component';
import { UiuxDesignComponent } from './Services/design/uiux-design/uiux-design.component';
import { PrintDesignComponent } from './Services/design/print-design/print-design.component';
import { IdentityDesignComponent } from './Services/design/identity-design/identity-design.component';
import { DevelopmentComponent } from './Services/development/development.component';
import { NoCodeDevelopmentComponent } from './Services/development/no-code-development/no-code-development.component';
import { FrontendDevelopmentComponent } from './Services/development/frontend-development/frontend-development.component';
import { BackendDevelopmentComponent } from './Services/development/backend-development/backend-development.component';
import { StrategyComponent } from './Services/strategy/strategy.component';
import { BrandStrategyComponent } from './Services/strategy/brand-strategy/brand-strategy.component';
import { UxStrategyComponent } from './Services/strategy/ux-strategy/ux-strategy.component';
import { UiuxAuditComponent } from './Services/strategy/uiux-audit/uiux-audit.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { WebsitesComponent } from './websites/websites.component';
import { InteractiveDemosComponent } from './interactive-demos/interactive-demos.component';
import { BrandingComponent } from './branding/branding.component';
import { AppDesignComponent } from './app-design/app-design.component';
import { ChildPortfolioComponent } from './child-portfolio/child-portfolio.component';
import { CtaCardComponent } from './cta-card/cta-card.component';
import { ExternalLoaderComponent } from './shared/components/external-loader/external-loader.component';
import { InternalLoaderComponent } from './shared/components/internal-loader/internal-loader.component';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { SaaSComponent } from './saas/saas.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PortfolioComponent,
    HeaderComponent,
    RootComponent,
    MainComponent,
    QueriesComponent,
    DigitalMarketingComponent,
    AboutUsComponent,
    ContactUsComponent,
    FilterPipe,
    BlogsComponent,
    BlogDetailsComponent,
    DesignComponent,
    UiuxDesignComponent,
    PrintDesignComponent,
    IdentityDesignComponent,
    DevelopmentComponent,
    NoCodeDevelopmentComponent,
    FrontendDevelopmentComponent,
    BackendDevelopmentComponent,
    StrategyComponent,
    BrandStrategyComponent,
    UxStrategyComponent,
    UiuxAuditComponent,
    SaaSComponent,
    WebsitesComponent,
    InteractiveDemosComponent,
    BrandingComponent,
    AppDesignComponent,
    ChildPortfolioComponent,
    CtaCardComponent,
    ExternalLoaderComponent,
    InternalLoaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule,
    CarouselModule
  ],
  providers: [
    DatePipe,
    Location, 
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
