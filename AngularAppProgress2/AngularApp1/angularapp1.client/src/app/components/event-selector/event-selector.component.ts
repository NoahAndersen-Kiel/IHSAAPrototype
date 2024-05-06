// event-selector.component.ts
import { Component } from '@angular/core';
import { SelectionService } from '../../services/selection.service';  // Ensure this is correctly imported

@Component({
  selector: 'app-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.css']
})
export class EventSelectorComponent {
  selectedEvent: string = '';

  constructor(private selectionService: SelectionService) { }

  onEventSelected(): void {
    console.log('Event selected (from dropdown):', this.selectedEvent);  // Debug statement
    this.selectionService.setSelectedEvent(this.selectedEvent);  // Update selected event in the SelectionService
  }
}
