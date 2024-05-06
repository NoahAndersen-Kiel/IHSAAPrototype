import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolSelectorComponent } from './components/school-selector/school-selector.component';
import { MeetSelectorComponent } from './components/meet-selector/meet-selector.component';
import { CompetitorsComponent } from './components/competitors/competitors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScoresComponent } from './components/scores/scores.component'; // Ensure this import is correct
import { MeetCreationComponent } from './components/meetcreation/meetcreation.component';
import { EventSelectorComponent } from './components/event-selector/event-selector.component';
import { GymnastComponent } from './components/gymnast/gymnast.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'meets', component: MeetSelectorComponent },
      { path: 'school', component: SchoolSelectorComponent },
      { path: 'competitors', component: CompetitorsComponent },
      { path: '', redirectTo: 'competitors', pathMatch: 'full' }
    ]
  },
  {
    path: 'scores',  // Adding new route for scores
    component: ScoresComponent,
    children: [
      { path: 'meets', component: MeetSelectorComponent },
      { path: 'events', component: EventSelectorComponent },
    ]
  },
  {
    path: 'meet-creation',
    component: MeetCreationComponent,
    children: [

    ]
  },
  {
    path: 'gymnast',
    component: GymnastComponent,
    children: [
      { path: 'school', component: SchoolSelectorComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


