import { AfterViewChecked, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeamListService } from '../../services/team-list.service';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent implements AfterViewChecked {
  teamListService = inject(TeamListService);

  teamList = this.teamListService.formatedTeamList;

  firstTeamName = 'Time A';
  secondTeamName = 'Time B';
  copied = false;

  ngAfterViewChecked(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  copyToClipboard() {
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 800);
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = `${this.firstTeamName}: \n${this.addBreakline(
      this.teamList().firstTeam
    )} \n${this.secondTeamName}: \n${this.addBreakline(
      this.teamList().secondTeam
    )}`;

    document.body.appendChild(textarea);

    // Select the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea element
    document.body.removeChild(textarea);
  }

  addBreakline(list: string[]) {
    return list
      .map((i) => `${i} \n`)
      .toString()
      .replaceAll(',', '');
  }
}
