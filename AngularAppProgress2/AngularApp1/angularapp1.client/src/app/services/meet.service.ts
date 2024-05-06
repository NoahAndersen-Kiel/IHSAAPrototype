import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meet } from '../models/meet.model';

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  private baseUrl = 'https://localhost:7242/api/meet';

  constructor(private http: HttpClient) { }

  getMeets(): Observable<Meet[]> {
    return this.http.get<Meet[]>(this.baseUrl);
  }

  addMeet(meet: Meet): Observable<Meet> {
    return this.http.post<Meet>(this.baseUrl, meet);
  }

  updateMeet(meet: Meet): Observable<Meet> {
    const url = `${this.baseUrl}/${meet.mid}`;
    return this.http.put<Meet>(url, meet);
  }
}
