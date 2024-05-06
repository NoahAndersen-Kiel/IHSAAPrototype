import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meet } from '../models/meet.model';

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  private apiUrl = 'https://localhost:7242/api/Meet'; 

  constructor(private http: HttpClient) { }

  // Method to fetch all meets
  getMeets(): Observable<Meet[]> { // Now returns an Observable of an array of Meet objects
    return this.http.get<Meet[]>(this.apiUrl);
  }

  // Add other methods as needed for CRUD operations
}
