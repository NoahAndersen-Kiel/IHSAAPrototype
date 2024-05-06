import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private baseUrl = 'https://localhost:7242/api/score'; // Adjust this URL based on your actual API endpoint

  constructor(private http: HttpClient) { }


  getScoresFiltered(meetId: number | null, selectedEvent: string | null): Observable<Score[]> {
    let params = new HttpParams();
    if (meetId !== null) {
      params = params.append('meetId', meetId.toString());
    }
    if (selectedEvent !== null) {
      params = params.append('selectedEvent', selectedEvent);
    }

    console.log(`Fetching scores with meetId: ${meetId}, selectedEvent: ${selectedEvent}`);
    return this.http.get<Score[]>(this.baseUrl, { params: params });
  }

  updateScore(ReferenceID: number, score: Score): Observable<Score> {
    if (!ReferenceID) {
      console.error('Failed to update score: ReferenceID is missing or invalid');
      throw new Error('ReferenceID is missing or invalid');
    }
    const url = `${this.baseUrl}/${ReferenceID}`;
    console.log(`Sending update request to ${url}`, score);
    return this.http.put<Score>(url, score);
  }
}
