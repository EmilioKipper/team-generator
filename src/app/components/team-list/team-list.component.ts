import { AfterViewChecked, Component, effect } from '@angular/core';
import { teamList } from '../../signals/team.signal';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface ITeam {
  name: string;
  list: string[];
}

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
  constructor() {
    effect(() => {
      const formatedList = this.removeListNumbers(teamList());
      const shuffledList = this.shuffleList(formatedList);

      this.splitTeams(shuffledList);
    });
  }

  ngAfterViewChecked(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  firstTeam: ITeam = {
    name: 'Time A',
    list: [],
  };

  secondTeam: ITeam = {
    name: 'Time B',
    list: [],
  };

  removeListNumbers(list: string[]) {
    return list.map((item) => item.replace(/\d+\.\s*/g, ''));
  }

  shuffleList(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  splitTeams(array: string[]) {
    if (array.length % 2 !== 0) {
      array.push('');
    }

    const mid = array.length / 2;
    const firstTeam = array.slice(0, mid);
    const secondTeam = array.slice(mid);

    this.firstTeam.list = firstTeam;
    this.secondTeam.list = secondTeam;
  }

  copyToClipboard() {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = `${this.firstTeam.name}: \n${this.addBreakline(
      this.firstTeam.list
    )} \n${this.secondTeam.name}: \n${this.addBreakline(this.secondTeam.list)}`;

    document.body.appendChild(textarea);

    // Select the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea element
    document.body.removeChild(textarea);

    console.log('Text copied to clipboard');
  }

  addBreakline(list: string[]) {
    return list
      .map((i) => `${i} \n`)
      .toString()
      .replaceAll(',', '');
  }
}
