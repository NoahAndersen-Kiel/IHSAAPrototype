import { Component, OnInit } from '@angular/core';
import { MeetService } from '../../services/meet-service.service'; // Ensure this is correctly imported
import { Meet } from '../../models/meet.model';
import { SelectionService } from '../../services/selection.service'; // Ensure this is correctly imported

@Component({
  selector: 'app-meet-selector',
  templateUrl: './meet-selector.component.html',
  styleUrls: ['./meet-selector.component.css']
})
export class MeetSelectorComponent implements OnInit {
  meets: Meet[] = [];

  constructor(
    private meetService: MeetService,
    private selectionService: SelectionService // Injecting the SelectionService
  ) { }

  ngOnInit(): void {
    this.loadMeets();
  }

  loadMeets(): void {
    this.meetService.getMeets().subscribe({
      next: (meets) => {
        this.meets = meets;
        console.log("Loaded meets:", meets);
      },
      error: (error) => console.error('Failed to load meets:', error)
    });
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = parseInt(target.value, 10); // Ensure parsing to integer
    if (!isNaN(value)) {
      this.selectionService.setSelectedMeetId(value); // Send only the meet ID
    } else {
      console.error('Invalid meet ID:', target.value);
    }
  }
}

