import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { teamList } from './signals/team.signal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamFormComponent, TeamListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  teamList = teamList();

  constructor() {
    effect(() => {
      this.teamList = teamList();
    });
  }
}
