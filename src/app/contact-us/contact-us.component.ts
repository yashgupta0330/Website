// import { Component } from '@angular/core';
// import { AppService } from '../app.service';
// import { UserData } from '../models/Users';
// import { CommonModule } from '@angular/common';
// import { FormsModule, NgForm } from '@angular/forms';
// import { DatePipe } from '@angular/common';
// import { GlobalStateService } from '../global-state.service';
// @Component({
//   selector: 'app-contact-us',
//   templateUrl: './contact-us.component.html',
//   styleUrl: './contact-us.component.scss',
//   imports: [CommonModule, FormsModule, DatePipe],
//   standalone: true,
// })
// export class ContactUsComponent {
//   ourEmail: string = 'marketing@anarish.com';
//   submitted: boolean = false;
//   submissionSuccess = false;
//   isLoading: boolean = false;
  

//   userData: UserData = {
//     name: '',
//     email: '',
//     phoneNumber: '',
//     intrests: [],
//     projectRequirements: '',
//     date: '',
//   };
//   intrests = [
//     { id: 1, option: 'UI-Design', value: false },
//     { id: 2, option: 'Product Design', value: false },
//     { id: 3, option: 'Frontend', value: false },
//     { id: 4, option: 'Backend', value: false },
//     { id: 5, option: 'Micro-site', value: false },
//     { id: 6, option: 'UX Consultation', value: false },
//     { id: 7, option: 'React Js', value: false },
//   ];

//   constructor(private appService: AppService, private globalState:GlobalStateService, private datePipe: DatePipe) {}


//   ngOnInit() {
  
//   }

//   updateState() {
//     this.globalState.setState({ stateSubject: true });

//     // this.globalState.state$.subscribe(state => {
//     //   console.log("state changed :", state);
//     // });

//   }

//   onChange(intrest: any): void {
//     intrest.value = !intrest.value;
//   }

//   submitHandler(form: NgForm) {
//     this.isLoading = true;


//     if (form.valid) {
//       this.submitted = true;
//       this.userData.intrests = this.intrests
//         .filter((obj) => obj.value)
//         .map((value) => value.option);

//       let currentDate = new Date();

//       let formattedDateTime =
//         '' +
//         this.datePipe.transform(currentDate, 'dd-MMM-yyyy') +
//         ' ' +
//         this.datePipe.transform(currentDate, 'HH:mm:ss');

//       this.userData.date = formattedDateTime;
//       this.appService.saveData(this.userData).subscribe(
//         (data) => {
//           console.log(data, ' : saved successfully');
//           this.updateState();
//           this.submissionSuccess = true;
//           this.isLoading = false;
//           this.submitted = false;

//           setTimeout(() => {
//             this.submissionSuccess = false;
//           }, 5000);
//         },
//         (error) => {
//           console.error('ERROR IN SAVING QUERY',error);
//           this.isLoading = false;
//           this.submitted = false;
//         }
//       );

//       // this.appService.sendMail(this.userData).subscribe(
//       //   (data) => console.log(data),
//       //   (error) => console.error(error)
//       // );

//       form.reset();
//       this.submitted = false;


//     } else {
//       this.submitted = true;
//       this.isLoading = false;
//     }


//     this.intrests.forEach((interest) => (interest.value = false));
//   }
// }




import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { UserData } from '../models/Users';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GlobalStateService } from '../global-state.service';
import { Meta, Title } from '@angular/platform-browser'; // ✅ Import Meta and Title

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  imports: [CommonModule, FormsModule, DatePipe],
  standalone: true,
})
export class ContactUsComponent {
  ourEmail: string = 'marketing@anarish.com';
  submitted: boolean = false;
  submissionSuccess = false;
  isLoading: boolean = false;

  userData: UserData = {
    name: '',
    email: '',
    phoneNumber: '',
    intrests: [],
    projectRequirements: '',
    date: '',
  };
  intrests = [
    { id: 1, option: 'UI-Design', value: false },
    { id: 2, option: 'Product Design', value: false },
    { id: 3, option: 'Frontend', value: false },
    { id: 4, option: 'Backend', value: false },
    { id: 5, option: 'Micro-site', value: false },
    { id: 6, option: 'UX Consultation', value: false },
    { id: 7, option: 'React Js', value: false },
  ];

  constructor(
    private appService: AppService,
    private globalState: GlobalStateService,
    private datePipe: DatePipe,
    private meta: Meta, // ✅ Inject Meta
    private title: Title // ✅ Inject Title
  ) {}

  ngOnInit(): void {
    // Set Title
    this.title.setTitle('Get in Touch With Anarish');

    // Set Meta Tags for Facebook
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://www.anarish.com/contact-us',
    });
    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Get in Touch With Anarish',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Get in touch with Anarish for top-tier software solutions in Delhi. Reach out to our team for inquiries, quotes, or consultations. We’re here to help you with all your software development needs. Contact us now',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://www.anarish.com/assets/img/og-image.jpg',
    });

    // Set Meta Tags for Twitter
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({
      property: 'twitter:domain',
      content: 'anarish.com',
    });
    this.meta.updateTag({
      property: 'twitter:url',
      content: 'https://www.anarish.com/contact-us',
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Get in Touch With Anarish',
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content:
        'Get in touch with Anarish for top-tier software solutions in Delhi. Reach out to our team for inquiries, quotes, or consultations. We’re here to help you with all your software development needs. Contact us now',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: 'https://www.anarish.com/assets/img/og-image.jpg',
    });
  }

  updateState() {
    this.globalState.setState({ stateSubject: true });

    // this.globalState.state$.subscribe(state => {
    //   console.log("state changed :", state);
    // });
  }

  onChange(intrest: any): void {
    intrest.value = !intrest.value;
  }

  submitHandler(form: NgForm) {
    this.isLoading = true;

    if (form.valid) {
      this.submitted = true;
      this.userData.intrests = this.intrests
        .filter((obj) => obj.value)
        .map((value) => value.option);

      let currentDate = new Date();

      let formattedDateTime =
        '' +
        this.datePipe.transform(currentDate, 'dd-MMM-yyyy') +
        ' ' +
        this.datePipe.transform(currentDate, 'HH:mm:ss');

      this.userData.date = formattedDateTime;
      this.appService.saveData(this.userData).subscribe(
        (data) => {
          console.log(data, ' : saved successfully');
          this.updateState();
          this.submissionSuccess = true;
          this.isLoading = false;
          this.submitted = false;

          setTimeout(() => {
            this.submissionSuccess = false;
          }, 5000);
        },
        (error) => {
          console.error('ERROR IN SAVING QUERY', error);
          this.isLoading = false;
          this.submitted = false;
        }
      );

      // this.appService.sendMail(this.userData).subscribe(
      //   (data) => console.log(data),
      //   (error) => console.error(error)
      // );

      form.reset();
      this.submitted = false;
    } else {
      this.submitted = true;
      this.isLoading = false;
    }

    this.intrests.forEach((interest) => (interest.value = false));
  }
}

