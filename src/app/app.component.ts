import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DowloadComponent } from "./dowload/dowload.component";
import { FormulaireComponent } from "./formulaire/formulaire.component";
import { BienComponent } from "./bien/bien.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule, DowloadComponent, FormulaireComponent, BienComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'surmesureformulaire';
}
