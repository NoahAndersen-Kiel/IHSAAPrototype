import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpParams
import { Observable } from 'rxjs';
import { Gymnast } from '../models/gymnast.model';

@Injectable({
  providedIn: 'root'
})
export class GymnastService {

  private baseUrl = 'https://localhost:7242/api/gymnast';

  constructor(private http: HttpClient) { }

  // Existing method to get all gymnasts
  getGymnasts(): Observable<Gymnast[]> {
    return this.http.get<Gymnast[]>(this.baseUrl);
  }

  // New method to get competitors based on filters
  getGymnastsFiltered(schoolName: string | null): Observable<Gymnast[]> {
    console.log(`Fetching gymnasts with schoolName: ${schoolName}`);
    let params = new HttpParams();
    if (schoolName !== null) {
      params = params.append('schoolName', schoolName);
    }
    return this.http.get<Gymnast[]>(this.baseUrl, { params });
  }

  updateGymnast(gymnast: Gymnast): Observable<Gymnast> {
    const url = `${this.baseUrl}/${gymnast.gymnastIndex}`; // Construct URL with gymnast PID
    return this.http.put<Gymnast>(url, gymnast); // Send PUT request
  }

  addGymnast(gymnast: Gymnast): Observable<Gymnast> {
    return this.http.post<Gymnast>(this.baseUrl, gymnast);
  }
}
