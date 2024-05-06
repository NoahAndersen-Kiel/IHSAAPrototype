import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../services/selection.service'; // Ensure to import SelectionService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class DashboardComponent implements OnInit {

  selectedSchool: string | null = null;
  selectedMeetId: number | null = null;
  constructor(private selectionService: SelectionService) { }

  ngOnInit(): void {
    this.selectionService.selectedSchoolName$.subscribe(schoolName => {
      this.selectedSchool = schoolName;
    });
    this.selectionService.selectedMeetId$.subscribe(meetId => {
      this.selectedMeetId = meetId;
    });
  }

  onSchoolSelected(event: Event): void {
    const target = event.target as HTMLSelectElement; // Correctly cast to HTMLSelectElement
    const schoolName = target.value === 'null' ? null : target.value; // Convert 'null' string to actual null
    this.selectionService.setSelectedSchoolName(schoolName);
  }

  onMeetSelected(event: Event): void {
    const element = event.target as HTMLSelectElement;
    const meetId = element.value === 'null' ? null : parseInt(element.value, 10);
    if (meetId !== null && !isNaN(meetId)) {
      this.selectionService.setSelectedMeetId(meetId);
    } else if (meetId === null) {
      this.selectionService.setSelectedMeetId(null); // Explicitly handle 'null' selection
    } else {
      console.error('Invalid meet ID:', element.value);
    }
  }
}

