import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Proper placement for FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { MeetSelectorComponent } from './components/meet-selector/meet-selector.component';
import { SchoolSelectorComponent } from './components/school-selector/school-selector.component';
import { CompetitorsComponent } from './components/competitors/competitors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScoresComponent } from './components/scores/scores.component';
import { EventSelectorComponent } from './components/event-selector/event-selector.component';
import { MeetCreationComponent } from './components/meetcreation/meetcreation.component';
import { GymnastComponent } from './components/gymnast/gymnast.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetSelectorComponent,
    SchoolSelectorComponent,
    CompetitorsComponent, // Ensure this is the correct component name
    DashboardComponent, ScoresComponent, EventSelectorComponent, MeetCreationComponent, GymnastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

