import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selectedSchoolNameSource = new BehaviorSubject<string | null>(null);
  private selectedMeetIdSource = new BehaviorSubject<number | null>(null); // Changed to number
  private selectedEventSource = new BehaviorSubject<string | null>(null);

  selectedSchoolName$ = this.selectedSchoolNameSource.asObservable();
  selectedMeetId$ = this.selectedMeetIdSource.asObservable();
  selectedEvent$ = this.selectedEventSource.asObservable();

  constructor() { }

  setSelectedSchoolName(schoolName: string | null): void {
    this.selectedSchoolNameSource.next(schoolName);
  }

  setSelectedMeetId(meetId: number | null): void { // Accepts a number now
    this.selectedMeetIdSource.next(meetId);
  }

  setSelectedEvent(selectedEvent: string | null): void {
    console.log('Setting event:', selectedEvent);
    this.selectedEventSource.next(selectedEvent);
  }
}

