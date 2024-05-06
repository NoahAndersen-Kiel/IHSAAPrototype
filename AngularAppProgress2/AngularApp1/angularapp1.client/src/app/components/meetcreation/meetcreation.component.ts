import { Component, OnInit, Input } from '@angular/core';
import { MeetService } from '../../services/meet.service';
import { Meet } from '../../models/meet.model';

@Component({
  selector: 'app-meet',
  templateUrl: './meetcreation.component.html',
  styleUrls: ['./meetcreation.component.css']
})
export class MeetCreationComponent implements OnInit {
  meets: Meet[] = [];

  constructor(private meetService: MeetService) { }

  ngOnInit(): void {
    this.loadMeets();
  }

  loadMeets(): void {
    this.meetService.getMeets().subscribe(
      data => {
        this.meets = data.map(meet => ({ ...meet, isEditing: false }));
        console.log('Meets loaded:', data);
      },
      error => console.error('Failed to load meets:', error)
    );
  }

  addNewMeet(): void {
    this.meets.push({ mid: 0, hostSchool: '', time: new Date(), isEditing: true });
  }

  saveMeet(meet: Meet): void {
    if (meet.mid) {
      this.meetService.updateMeet(meet).subscribe({
        next: () => {
          meet.isEditing = false;
          console.log('Meet update successful');
        },
        error: error => {
          console.error('Failed to update meet:', error);
          alert('Failed to update meet: ' + error.message);
        }
      });
    } else {
      this.meetService.addMeet(meet).subscribe({
        next: (savedMeet) => {
          meet.mid = savedMeet.mid; // Update with the new Mid from the database
          meet.isEditing = false;
          console.log('Meet addition successful');
        },
        error: error => {
          console.error('Failed to add meet:', error);
          alert('Failed to add meet: ' + error.message);
        }
      });
    }
  }
}
