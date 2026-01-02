import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { LoaderService } from '../shared/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BlogsService, Blog } from '../blogs.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  showMobileSidebar: boolean = false;
  isLinkCopied: boolean = false;
  blogSlug: string | null = null;
  // Add this near the top of your class properties
  layoutType: 'two-col' | 'three-col' = 'three-col';

  getFullBlogUrl(): string {
    const productionUrl = 'https://www.anarish.com';
    if (this.blog) {
      return productionUrl + '/blogs' + this.blog.url;
    }
    return window.location.href;
  }

  private openSharePopup(
    url: string,
    name: string,
    width: number,
    height: number
  ): void {
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(
      url,
      name,
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0,resizable=1,scrollbars=1`
    );
  }

  shareOnLinkedIn(): void {
    const fullUrl = this.getFullBlogUrl();
    const linkedInUrl = `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${encodeURIComponent(
      fullUrl
    )}`;
    this.openSharePopup(linkedInUrl, 'linkedin-share-dialog', 600, 700);
  }

  shareOnTwitter(): void {
    const fullUrl = this.getFullBlogUrl();
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      fullUrl
    )}`;
    this.openSharePopup(twitterUrl, 'twitter-share-dialog', 550, 420);
  }

  shareOnFacebook(): void {
    const fullUrl = this.getFullBlogUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullUrl
    )}`;
    this.openSharePopup(facebookUrl, 'facebook-share-dialog', 600, 600);
  }

  blog: Blog | null = null;

  suggestedBlogs: any[] = [];
  blogContent: SafeHtml = '';
  faqs: { question: string; answer: string | string[] }[] = [];
  activeAccordionIndex: number | null = null;

  linkedInShareUrl: string = '';
  facebookShareUrl: string = '';

  // Scroll Spy Properties
  tableOfContents: { id: string; title: string }[] = [];
  activeSection: string = '';
  private observer: IntersectionObserver | null = null;
  private isManualScroll: boolean = false;

  private cssLinkElement: HTMLLinkElement | null = null;
  private jsScriptElement: HTMLScriptElement | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private meta: Meta,
    private title: Title,
    private elementRef: ElementRef,
    private loaderService: LoaderService,
    private blogsService: BlogsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.blogSlug = params.get('slug');
      if (this.blogSlug) {
        this.fetchBlogDetails();
        this.fetchSuggestedBlogs();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeBootstrapTooltips();
  }

  initializeBootstrapTooltips(): void {
    setTimeout(() => {
      const tooltipTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
      });
    }, 500);
  }

  fetchBlogDetails(): void {
    // Loader handled by interceptor
    this.blogsService.load();
    this.blogsService.blogsData$.subscribe((blogs) => {
      if (!blogs || blogs.length === 0) return;
      this.blog = blogs.find((blog: any) => blog.url.replace(/^\//, '') === this.blogSlug) || null;
      if (!this.blog) {
        console.warn('❌ Blog not found. Check if the slug in URL matches JSON data.');
        this.loaderService.hideInternalLoader();
      } else {
        if ((this.blog as any).isTwoColumn === true) {
          this.layoutType = 'two-col';
        } else {
          this.layoutType = 'three-col';
        }
       this.fetchBlogHTML(this.blog.folder_id);

        // 2. Always load the CSS file.
        // We keep this outside the 'if' so styling works for all blogs.
        this.loadBlogCSS(this.blog.folder_id);

        // 3. Selective JavaScript Loading.
        // We changed 'hasCustomJS' to 'hasCustomAssets' to match your JSON flag.
        if ((this.blog as any).hasCustomAssets === true) {
          console.log("Slider assets flag detected. Loading JS...");
          
          // Wait 1 second to ensure the HTML is in the DOM before script runs
          setTimeout(() => this.loadBlogJS(this.blog!.folder_id), 1000);
        } else {
          // No error is triggered here; the script is ignored for normal blogs
          console.log("Normal blog detected. Custom JS load skipped.");
        }

        // 4. Load remaining content (FAQs, etc.)
        this.loadFaqs();
        const productionUrl = 'https://www.anarish.com';
        const canonicalUrl = productionUrl + this.blog.url;
        const imageUrl = productionUrl + this.blog.img;
        this.title.setTitle(this.blog.title);
        this.meta.updateTag({ name: 'description', content: this.blog.summary });
        this.meta.updateTag({ property: 'og:title', content: this.blog.title });
        this.meta.updateTag({ property: 'og:description', content: this.blog.summary });
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
        this.meta.updateTag({ property: 'og:image', content: imageUrl });
        this.meta.updateTag({ property: 'og:image:secure_url', content: imageUrl });
        this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
        this.meta.updateTag({ property: 'og:image:width', content: '1200' });
        this.meta.updateTag({ property: 'og:image:height', content: '630' });
        this.meta.updateTag({ property: 'og:site_name', content: 'Anarish' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: this.blog.title });
        this.meta.updateTag({ name: 'twitter:description', content: this.blog.summary });
        this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
        const existingCanonical = document.querySelector("link[rel='canonical']");
        if (existingCanonical) {
          existingCanonical.remove();
        }
        const canonicalTag = this.renderer.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        canonicalTag.setAttribute('href', canonicalUrl);
        document.head.appendChild(canonicalTag);
        this.linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
        this.facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`;
      }
    });
  }

  fetchBlogHTML(folderId: string): void {
    const htmlFilePath = `/assets/data/blogs/${folderId}/child-blog.html`;
    this.http.get(htmlFilePath, { responseType: 'text' }).subscribe(
      (htmlContent) => {
        this.blogContent = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
        // Wait for DOM update, then extract headings and setup scroll spy
        setTimeout(() => {
          this.extractHeadingsFromContent();
          this.setupScrollSpy();
        }, 0);
        // Loader handled by interceptor
      },
      (error) => {
        console.error('❌ Error fetching blog HTML:', error);
        // Loader handled by interceptor
      }
    );
  }

  loadBlogCSS(folderId: string): void {
    if (this.cssLinkElement) {
      this.renderer.removeChild(document.head, this.cssLinkElement);
    }

    const cssFilePath = `/assets/data/blogs/${folderId}/child-blog.css`;
    this.cssLinkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(this.cssLinkElement, 'rel', 'stylesheet');
    this.renderer.setAttribute(this.cssLinkElement, 'href', cssFilePath);
    this.renderer.appendChild(document.head, this.cssLinkElement);
  }

  loadBlogJS(folderId: string): void {
    if (this.jsScriptElement) {
      this.renderer.removeChild(document.body, this.jsScriptElement);
    }

    const jsFilePath = `/assets/data/blogs/${folderId}/child-blog.js`;
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'src', jsFilePath);
    this.renderer.setAttribute(script, 'type', 'text/javascript');

    script.onload = () => console.log('✅ Blog JS loaded successfully.');
    script.onerror = () =>
      console.warn('⚠️ Blog JS not found or failed to load.');

    this.renderer.appendChild(document.body, script);
    this.jsScriptElement = script;
  }

  loadFaqs(): void {
    if (this.blog && this.blog.folder_id) {
      const faqFilePath = `/assets/data/blogs/${this.blog.folder_id}/faq.json`;
      this.http
        .get<{ faqs: { question: string; answer: string | string[] }[] }>(
          faqFilePath
        )
        .subscribe(
          (data) => (this.faqs = data.faqs),
          () => (this.faqs = [])
        );
    } else {
      this.faqs = [];
    }
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  getAnswers(answer: string | string[]): string[] {
    return Array.isArray(answer) ? answer : [answer];
  }

  formatAnswer(answer: string): string {
    return answer.replace(/\n/g, '<br>');
  }

  safeFormatAnswer(answer: string | string[]): string {
    if (typeof answer === 'string') {
      return this.formatAnswer(answer);
    }
    return '';
  }

  fetchSuggestedBlogs(): void {
    this.blogsService.blogsData$.subscribe((blogs) => {
      if (blogs && blogs.length > 0) {
        const filteredBlogs = blogs.filter(
          (blog: any) => blog.url.replace(/^\//, '') !== this.blogSlug
        );
        this.suggestedBlogs = this.getRandomBlogs(filteredBlogs, 3);
      }
    });
  }

  getRandomBlogs(blogList: any[], count: number): any[] {
    return blogList
      .slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  get formattedDate(): string {
    return this.blog ? this.getRelativeTime(this.blog.date) : 'Unknown Date';
  }

  getRelativeTime(dateString: string): string {
    const blogDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - blogDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return blogDate
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .replace(',', '');
  }

  copyLink(): void {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        this.isLinkCopied = true;
        setTimeout(() => (this.isLinkCopied = false), 2000);
      })
      .catch((err) => console.error('❌ Failed to copy: ', err));
  }

  goToBlog(blogUrl: string): void {
    if (blogUrl) {
      this.router.navigate(['/blog', blogUrl]);
    } else {
      console.error('Invalid blog URL');
    }
  }

  goToSuggestedBlog(blog: any): void {
    if (blog && blog.url) {
      const blogSlug = blog.url.replace(/^\//, '');
      this.router.navigate(['/blogs', blogSlug]);
    } else {
      console.error('Invalid blog data or URL');
    }
  }

  goToAllBlogs(): void {
    this.router.navigate(['/blogs']);
  }

  ngOnDestroy(): void {
    if (this.cssLinkElement) {
      this.renderer.removeChild(document.head, this.cssLinkElement);
      this.cssLinkElement = null;
    }

    if (this.jsScriptElement) {
      this.renderer.removeChild(document.body, this.jsScriptElement);
      this.jsScriptElement = null;
    }

    // Clean up IntersectionObserver
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  // Scroll Spy Methods
  extractHeadingsFromContent(): void {
    const contentElement =
      this.elementRef.nativeElement.querySelector('.blog-content');
    if (!contentElement) return;

    const headings = contentElement.querySelectorAll('h2');
    this.tableOfContents = [];

    // Logic: We no longer change layoutType here based on headings.
    // We only loop through headings to build the Table of Contents list.

    headings.forEach((heading: Element, index: number) => {
      const headingElement = heading as HTMLElement;
      const headingText = headingElement.textContent?.trim() || '';

      let headingId = headingElement.id;
      if (!headingId) {
        headingId = `section-${index}`;
        headingElement.id = headingId;
      }

      const anchorId = `anchor-${headingId}`;
      if (!document.getElementById(anchorId)) {
        const anchor = document.createElement('span');
        anchor.id = anchorId;
        anchor.className = 'scroll-anchor';
        anchor.style.display = 'block';
        anchor.style.position = 'relative';
        anchor.style.top = '-140px';
        anchor.style.height = '1px';
        headingElement.parentNode?.insertBefore(anchor, headingElement);
      }

      this.tableOfContents.push({
        id: anchorId,
        title: headingText,
      });
    });
  }

  setupScrollSpy(): void {
    const options = {
      root: null,
      rootMargin: '-100px 0px -66% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isManualScroll) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    // Observe all sections
    this.tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  scrollToSection(sectionId: string): void {
    // Immediately update active section on click
    this.activeSection = sectionId;
    this.isManualScroll = true;

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }

      // Re-enable observer after scroll completes
      setTimeout(() => {
        this.isManualScroll = false;
      }, 1000);
    }, 100);
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
