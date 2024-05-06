import { Component, OnInit, Input } from '@angular/core';
import { CompetitorService } from '../../services/competitor-service.service';
import { Competitor } from '../../models/competitor.model';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.css']
})
export class CompetitorsComponent implements OnInit {
  @Input() schoolName: string | null = null;
  @Input() meetId: number | null = null;
  private currentSchoolName: string | null = null;
  private currentMeetId: number | null = null;
  competitors: Competitor[] = [];

  constructor(
    private competitorService: CompetitorService,
    private selectionService: SelectionService
  ) { }

  ngOnInit(): void {
    this.selectionService.selectedSchoolName$.subscribe(schoolName => {
      console.log(`Selected schoolName changed: ${schoolName}`);
      this.currentSchoolName = schoolName;
      this.updateCompetitors();
    });

    this.selectionService.selectedMeetId$.subscribe(meetId => {
      console.log(`Selected meetId changed: ${meetId}`);
      this.currentMeetId = meetId;
      this.updateCompetitors();
    });
  }

  updateCompetitors(): void {
    console.log(`Updating competitors with schoolName: ${this.currentSchoolName}, meetId: ${this.currentMeetId}`);
    // Always fetch competitors, regardless of whether the school name or meet ID is null
    this.fetchCompetitorsBasedOnSelection(this.currentSchoolName, this.currentMeetId);
  }

  fetchCompetitorsBasedOnSelection(schoolName: string | null, meetId: number | null): void {
    console.log(`Fetching data with schoolName: ${schoolName}, meetId: ${meetId}`);
    this.competitorService.getCompetitorsFiltered(schoolName, meetId).subscribe(
      data => {
        console.log('Data fetched successfully', data);
        this.competitors = data;
        isEditing: false  // Initialize isEditing when fetching data
      }, error => {
        console.error('Failed to load competitors based on filters:', error);
      }
    );
  }

  toggleEdit(competitor: Competitor): void {
    competitor.isEditing = !competitor.isEditing;
  }

  saveCompetitor(competitor: Competitor): void {
    this.competitorService.updateCompetitor(competitor).subscribe({
      next: () => {
        competitor.isEditing = false; // Turn off editing mode on successful save
        console.log('Update successful');
      },
      error: (error) => {
        console.error('Update failed', error);
      }
    });
  }
}

