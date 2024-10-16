import { Component, inject } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { TeamListService } from '../../services/team-list.service';

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
  teamListService = inject(TeamListService);

  teamList = new FormControl('', Validators.required);

  onSubmit() {
    this.teamListService.teamList.set(this.teamList.value as string);
  }
}
