import { Component } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { teamList } from '../../signals/team.signal';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css',
})
export class TeamFormComponent {
  teamList = new FormControl('', Validators.required);

  onSubmit() {
    const list = this.textToArray(this.teamList.value?.trim() as string);

    teamList.set(list);
  }

  textToArray(text: string) {
    return text.split('\n');
  }
}
