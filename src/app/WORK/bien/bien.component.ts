import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bien',
  standalone: true,
  imports: [ FormsModule,RouterLink],
  templateUrl: './bien.component.html',
  styleUrl: './bien.component.css'
})
export class BienComponent {

}
