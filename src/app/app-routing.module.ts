import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root/root.component';
import { MainComponent } from './main/main.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { QueriesComponent } from './queries/queries.component';
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
import { SaaSComponent } from './saas/saas.component';
import { InteractiveDemosComponent } from './interactive-demos/interactive-demos.component';
import { BrandingComponent } from './branding/branding.component';
import { AppDesignComponent } from './app-design/app-design.component';
import { DigitalMarketingComponent } from './digital-marketing/digital-marketing.component';
import { ChildPortfolioComponent } from './child-portfolio/child-portfolio.component';
import { WebsitesComponent } from './websites/websites.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        data: {
          title:
            'Anarish | Emerging UI UX Design Agency for B2B',
          description:
            'An award-winning UI/UX design agency creating intuitive, engaging digital experiences by blending strategy, aesthetics, and technology to drive results',
          keywords: 'Anarish, innovations, business solutions, technology , UI UX design agency',
        },
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        data: {
          title: 'About Us - Anarish Innovations',
          description:
            'Learn more about Anarish Innovations, our vision, and our team.',
          keywords: 'About Anarish, company vision, team',
        },
      },
      {
        path: 'blogs',
        component: BlogsComponent,
        data: {
          title: 'Blogs - Anarish Innovations',
          description:
            'Stay updated with the latest trends and insights in technology and business.',
          keywords: 'blogs, technology, business trends',
        },
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: {
          title: 'Contact Us - Anarish Innovations',
          description:
            'Get in touch with Anarish Innovations for inquiries and support.',
          keywords: 'contact, support, Anarish Innovations',
        },
      },
      {
        path: 'solutions/saas-design',
        component: SaaSComponent,
        data: {
          title: 'Services - Anarish Innovations',
          description:
            'Explore our professional services tailored to your business needs.',
          keywords: 'business services, technology solutions',
        },
      },
      {
        path: 'solutions/interactive-demos',
        component: InteractiveDemosComponent,
        data: {
          title: 'Services - Anarish Innovations',
          description:
            'Explore our professional services tailored to your business needs.',
          keywords: 'business services, technology solutions',
        },
      },
      {
        path: 'solutions/app-design',
        component: AppDesignComponent,
        data: {
          title: 'Services - Anarish Innovations',
          description:
            'Explore our professional services tailored to your business needs.',
          keywords: 'business services, technology solutions',
        },
      },
      {
        path: 'solutions/branding',
        component: BrandingComponent,
        data: {
          title: 'Services - Anarish Innovations',
          description:
            'Explore our professional services tailored to your business needs.',
          keywords: 'business services, technology solutions',
        },
      },
      {
        path: 'solutions/digital-marketing',
        component: DigitalMarketingComponent,
        data: {
          title: 'Services - Anarish Innovations',
          description:
            'Explore our professional services tailored to your business needs.',
          keywords: 'business services, technology solutions',
        },
      },
      {
        path: 'solutions/websites',
        component: WebsitesComponent,
        data: {
          title: 'Services - Anarish Innovations',
          description:
            'Explore our professional services tailored to your business needs.',
          keywords: 'business services, technology solutions',
        },
      },
      {
        path: 'design',
        component: DesignComponent,
        data: {
          title: 'Services - Anarish Innovations',
          description:
            'Explore our professional services tailored to your business needs.',
          keywords: 'business services, technology solutions',
        },
      },
      {
        path: 'design/uiux-design',
        component: UiuxDesignComponent,
        data: {
          title: 'UI/UX Design - Anarish Innovations',
          description:
            'Experience-led UI/UX design services that combine user research, creative strategy, and intuitive interfaces.',
          keywords: 'UI UX design, user experience, interface design, web design',
        },
      },
      {
        path: 'design/print-design',
        component: PrintDesignComponent,
        data: {
          title: 'Print Design - Anarish Innovations',
          description:
            'High-impact print design services including brochures, packaging, business cards, and marketing materials.',
          keywords: 'print design, brochure design, packaging design, marketing materials',
        },
      },
      {
        path: 'design/identity-design',
        component: IdentityDesignComponent,
        data: {
          title: 'Identity Design - Anarish Innovations',
          description:
            'Visual identity design services creating cohesive brand systems with logos, guidelines, and brand assets.',
          keywords: 'identity design, logo design, brand identity, visual identity, brand guidelines',
        },
      },
      {
        path: 'development',
        component: DevelopmentComponent,
        data: {
          title: 'Development Services - Anarish Innovations',
          description:
            'Expert development services for web and mobile applications.',
          keywords: 'web development, mobile development, software development',
        },
      },
      {
        path: 'development/no-code-development',
        component: NoCodeDevelopmentComponent,
        data: {
          title: 'No Code Development - Anarish Innovations',
          description:
            'Build powerful applications without coding using WordPress, Shopify, Wix and Webflow.',
          keywords: 'no code development, WordPress, Shopify, Wix, Webflow',
        },
      },
      {
        path: 'development/frontend-development',
        component: FrontendDevelopmentComponent,
        data: {
          title: 'Frontend Development - Anarish Innovations',
          description:
            'Modern frontend development with HTML, CSS, JS, React JS, Angular JS and Bootstrap.',
          keywords: 'frontend development, HTML, CSS, JavaScript, React, Angular',
        },
      },
      {
        path: 'development/backend-development',
        component: BackendDevelopmentComponent,
        data: {
          title: 'Backend Development - Anarish Innovations',
          description:
            'Robust backend solutions with MySQL, PHP, Laravel, Python, Node.js, and Express.js.',
          keywords: 'backend development, MySQL, PHP, Laravel, Python, Node.js',
        },
      },
      {
        path: 'strategy',
        component: StrategyComponent,
        data: {
          title: 'Services - Anarish Innovations',
          description:
            'Explore our professional services tailored to your business needs.',
          keywords: 'business services, technology solutions',
        },
      },
      {
        path: 'strategy/brand-strategy',
        component: BrandStrategyComponent,
        data: {
          title: 'Brand Strategy - Anarish Innovations',
          description:
            'Strategic brand positioning and identity development to establish meaningful market presence.',
          keywords: 'brand strategy, brand positioning, brand identity, market strategy',
        },
      },
      {
        path: 'strategy/ux-strategy',
        component: UxStrategyComponent,
        data: {
          title: 'UX Strategy - Anarish Innovations',
          description:
            'Research-driven UX strategy to create exceptional user experiences aligned with business goals.',
          keywords: 'UX strategy, user experience strategy, user research, experience design',
        },
      },
      {
        path: 'strategy/uiux-audit',
        component: UiuxAuditComponent,
        data: {
          title: 'UI/UX Audit - Anarish Innovations',
          description:
            'Comprehensive UI/UX audit to identify usability issues and optimize digital experiences.',
          keywords: 'UI UX audit, usability audit, heuristic evaluation, UX review',
        },
      },
      {
        path: 'queries',
        component: QueriesComponent,
        data: {
          title: 'Queries - Anarish Innovations',
          description:
            'Find answers to frequently asked questions about our services.',
          keywords: 'queries, FAQ, Anarish support',
        },
      },
      {
        path: 'portfolio',
        component: PortfolioComponent,
        data: {
          title: 'Work - Anarish Innovations',
          description: 'Current Projects we are Working on',
          keywords: 'Anarish-work',
        },
      },
      {
        path: 'portfolio/:slug',
        component: ChildPortfolioComponent,
        data: {
          title: 'Work - Anarish Innovations',
          description: 'Current Projects we are Working on',
          keywords: 'Anarish-work',
        },
      },
      {
        path: 'blogs/:slug',
        component: BlogDetailsComponent,
        data: {
          title: 'Blog Details - Anarish Innovations',
          description: 'Read in-depth articles and insights from our experts.',
          keywords: 'blog, technology insights, business articles',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'disabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 50],
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
