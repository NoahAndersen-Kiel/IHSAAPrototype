import { Component, OnInit } from '@angular/core';
import { SchoolServiceService } from '../../services/school-service.service'; // Update the path as needed
import { IndianaSchool } from '../../models/indiana-school.model';
import { SelectionService } from '../../services/selection.service'; // Ensure this is correctly imported

@Component({
  selector: 'app-school-selector',
  templateUrl: './school-selector.component.html',
  styleUrls: ['./school-selector.component.css']
})
export class SchoolSelectorComponent implements OnInit {
  schools: IndianaSchool[] = [];

  constructor(
    private schoolService: SchoolServiceService,
    private selectionService: SelectionService // Injecting the SelectionService
  ) { }

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools(): void {
    this.schoolService.getSchools().subscribe({
      next: (schools) => {
        this.schools = schools;
        console.log("Loaded schools:", schools);
      },
      error: (error) => console.error('Failed to load schools:', error)
    });
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectionService.setSelectedSchoolName(value); // Correctly call the updated service method
  }
}

