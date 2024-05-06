import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpParams
import { Observable } from 'rxjs';
import { Competitor } from '../models/competitor.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitorService {

  private baseUrl = 'https://localhost:7242/api/competitor';

  constructor(private http: HttpClient) { }

  // Existing method to get all competitors
  getCompetitors(): Observable<Competitor[]> {
    return this.http.get<Competitor[]>(this.baseUrl);
  }

  // New method to get competitors based on filters
  getCompetitorsFiltered(schoolName: string | null, meetId: number | null): Observable<Competitor[]> {
    console.log(`Fetching competitors with schoolName: ${schoolName}, meetId: ${meetId}`);
    let params = new HttpParams();
    if (schoolName !== null) {
      params = params.append('schoolName', schoolName);
    }
    if (meetId !== null) {
      params = params.append('meetId', meetId);
    }

    return this.http.get<Competitor[]>(this.baseUrl, { params });
  }

  updateCompetitor(competitor: Competitor): Observable<Competitor> {
    const url = `${this.baseUrl}/${competitor.id}`; // Construct URL with competitor ID
    return this.http.put<Competitor>(url, competitor); // Send PUT request
  }
}




