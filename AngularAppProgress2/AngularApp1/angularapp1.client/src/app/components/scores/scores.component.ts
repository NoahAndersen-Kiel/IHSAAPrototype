// scores.component.ts
import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score-service.service';
import { Score } from '../../models/score.model';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scores: Score[] = [];
  selectedMeetId: number | null = null;
  selectedEvent: string | null = null;  // Allow for null, and initialize as such
  editingIndex: number | null = null;  // Properly declare the property

  constructor(private scoreService: ScoreService, private selectionService: SelectionService) { }

  ngOnInit(): void {
    this.subscribeToSelections();
  }

  subscribeToSelections(): void {
    this.selectionService.selectedMeetId$.subscribe(meetId => {
      this.selectedMeetId = meetId;
      this.updateScores();  // Update scores whenever a new meet ID is selected
    });

    this.selectionService.selectedEvent$.subscribe(event => {
      this.selectedEvent = event;  // It can be null, handle accordingly in the view
      this.updateScores();  // Update scores whenever a new event is selected
    });
  }

  updateScores(): void {
    // Check if both meet ID and event are selected
    if (this.selectedMeetId && this.selectedEvent) {
      this.scoreService.getScoresFiltered(this.selectedMeetId, this.selectedEvent).subscribe(
        data => {
          console.log('Fetched scores:', data);  // Log fetched data
          this.scores = data;
          this.assignPlaces(this.scores);
          this.scores.forEach(score => score.isEditing = false); // Initialize scores not in edit mode
        },
        error => console.error('Error fetching scores:', error)
      );
    } else {
      // Log specific information about what is not selected
      if (!this.selectedMeetId && !this.selectedEvent) {
        console.log('Neither Meet ID nor Event has been selected.');
      } else if (!this.selectedMeetId) {
        console.log('Meet ID not selected.');
      } else if (!this.selectedEvent) {
        console.log('Event not selected.');
      }
    }
  }

  assignPlaces(scores: Score[]): void {
    // Initialize the accumulator with a clear type definition
    const groupedByEvent: Record<string, Score[]> = scores.reduce((acc, score) => {
      const event = score.selectedEvent;
      if (!acc[event]) {
        acc[event] = [];
      }
      acc[event].push(score);
      return acc;
    }, {} as Record<string, Score[]>);  // Cast the initial value to the correct type

    // Iterate over each event to assign places
    Object.keys(groupedByEvent).forEach(event => {
      groupedByEvent[event].sort((a, b) => b.maxScore - a.maxScore);  // Sort by MaxScore descending
      groupedByEvent[event].forEach((score, index) => {
        score.place = index + 1;  // Assign placement starting from 1
      });
    });

    // Update or process your scores array if needed
    this.scores = Object.values(groupedByEvent).flat();  // Flatten grouped scores back into a single array
  }


  toggleEdit(index: number): void {
    const score = this.scores[index];
    if (score.isEditing && score.isNew) {
      this.scores.splice(index, 1); // Remove the new score if editing is cancelled
    } else {
      score.isEditing = !score.isEditing;
    }
    this.editingIndex = null; // Reset editing index
  }

  saveScore(score: Score): void {
    this.scoreService.updateScore(score.referenceID, score).subscribe({
      next: () => {
        score.isEditing = false; // Turn off editing mode on successful save
        console.log('Score update successful', score);
      },
      error: error => {
        console.error('Failed to update score:', error);
        alert('Failed to update score: ' + error.message); // Keeping an alert here for user feedback, similar to the earlier version
      }
    });
  }
}
