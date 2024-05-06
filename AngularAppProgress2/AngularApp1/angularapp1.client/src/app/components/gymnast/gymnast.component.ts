import { Component, OnInit, Input } from '@angular/core';
import { GymnastService } from '../../services/gymnast.service';
import { Gymnast } from '../../models/gymnast.model';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-gymnast',
  templateUrl: './gymnast.component.html',
  styleUrl: './gymnast.component.css'
})

export class GymnastComponent implements OnInit {
  @Input() schoolName: string | null = null;
  private currentSchoolName: string | null = null;
  gymnasts: Gymnast[] = [];

  constructor(
    private gymnastService: GymnastService,
    private selectionService: SelectionService
  ) { }

  ngOnInit(): void {
    this.selectionService.selectedSchoolName$.subscribe(schoolName => {
      console.log(`Selected schoolName changed: ${schoolName}`);
      this.currentSchoolName = schoolName;
      this.updateGymnasts();
    });
  }

  updateGymnasts(): void {
    console.log(`Updating gymnasts with schoolName: ${this.currentSchoolName}`);
    // Always fetch gymnasts, regardless of whether the school name or meet ID is null
    this.fetchGymnastsBasedOnSelection(this.currentSchoolName);
  }

  fetchGymnastsBasedOnSelection(schoolName: string | null): void {
    console.log(`Fetching data with schoolName: ${schoolName}`);
    this.gymnastService.getGymnastsFiltered(schoolName).subscribe(
      data => {
        console.log('Data fetched successfully', data);
        this.gymnasts = data;
        isEditing: false  // Initialize isEditing when fetching data
      }, error => {
        console.error('Failed to load gymnasts based on filters:', error);
      }
    );
  }

  toggleEdit(gymnast: Gymnast): void {
    gymnast.isEditing = !gymnast.isEditing;
  }

  addNewGymnast(): void {
    const newGymnast: Gymnast = {
      pid: '',  // Make sure this is empty or null for new entries
      name: '',
      schoolName: '',
      year: '',
      doB: new Date,
      isEditing: true
    };
    this.gymnasts.push(newGymnast);
  }

  saveGymnast(gymnast: Gymnast): void {
    if (gymnast.gymnastIndex) {
      this.gymnastService.updateGymnast(gymnast).subscribe({
        next: () => {
          gymnast.isEditing = false; // Turn off editing mode on successful save
          console.log('Update successful');
        },
        error: (error) => {
          console.error('Update failed', error);
          alert('Failed to update gymnast: ' + error.message);
        }
      });
    } else {
      this.gymnastService.addGymnast(gymnast).subscribe({
        next: (savedGymnast) => {
          // Assign the received GymnastIndex to the new gymnast
          gymnast.gymnastIndex = savedGymnast.gymnastIndex;
          gymnast.isEditing = false;
          console.log('Addition successful');
        },
        error: (error) => {
          console.error('Addition failed', error);
          alert('Failed to add gymnast: ' + error.message);
        }
      });
    }
  }
}
