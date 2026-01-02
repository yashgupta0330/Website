import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  intrests: string[];
  projectRequirements: string;
  date: string;
}

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss'],
  providers: [DatePipe]
})
export class QueriesComponent implements OnInit {
  users: User[] = [];
  searchQuery: string = ''; // Search query property

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.http.get<{ users: User[] }>('https://anarish-website-v3.vercel.app/users').subscribe(response => {
      console.log('Fetched users:', response.users);

      // Filter users with valid dates and sort by date in descending order
      this.users = response.users
        .filter(user => this.isValidDate(user.date))
        .map(user => {
          user.date = this.parseDate(user.date); // Convert to ISO format
          return user;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date in descending order
        .map(user => {
          user.date = this.formatDate(user.date); // Format the date after sorting
          return user;
        });

      console.log('Users in component (sorted):', this.users);
    }, error => {
      console.error('Error fetching user data:', error);
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd MMM yyyy HH:mm:ss') || 'Invalid Date';
  }

  parseDate(dateString: string): string {
    try {
      if (!dateString) throw new Error('Received undefined dateString');

      // Handle ISO format directly
      if (dateString.includes('T')) return dateString;

      // Handle the format "DD-MMM-YYYY HH:mm:ss"
      const regex = /(\d{2})-(\w{3})-(\d{4}) (\d{2}:\d{2}:\d{2})/;
      const match = dateString.match(regex);

      if (!match) throw new Error('Invalid date format');

      const [_, day, month, year, time] = match;
      const months: { [key: string]: string } = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
      };

      return `${year}-${months[month as keyof typeof months]}-${day}T${time}`;
    } catch (error) {
      return 'Invalid Date';
    }
  }

  isValidDate(dateString: string): boolean {
    const parsedDate = this.parseDate(dateString);
    const date = new Date(parsedDate);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date encountered:', dateString);
      return false;
    }
    return true;
  }
}
