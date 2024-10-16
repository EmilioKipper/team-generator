import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamListService } from './services/team-list.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamFormComponent, TeamListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  teamListService = inject(TeamListService);

  hasTeamList = this.teamListService.hasTeamList;
}
