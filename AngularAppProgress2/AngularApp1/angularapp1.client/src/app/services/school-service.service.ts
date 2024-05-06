import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndianaSchool } from '../models/indiana-school.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolServiceService {

  private apiUrl = 'https://localhost:7242/api/IndianaSchool';

  constructor(private http: HttpClient) { }

  // Method to fetch all Indiana Schools
  getSchools(): Observable<IndianaSchool[]> { // Now returns an Observable of an array of Indina School objects
    return this.http.get<IndianaSchool[]>(this.apiUrl);
  }

  // Add other methods as needed for CRUD operations
}

