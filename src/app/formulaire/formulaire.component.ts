import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [ CommonModule,FormsModule,RouterLink],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {


  // Model object to store form data
  formData = {
    raisonSocial: '',
    responsable: '',
    adresse: '',
    email: '',
    telephone1: '',
    telephone2: '',
    utilisateur: 0,
    dateDebut: '',
    autres: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  isLoading: boolean = false;

  onSubmit(form: NgForm): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir soumettre ce formulaire ?');

    if (confirmation && form.valid) {
      this.http.post('https://mesure-5fc2.onrender.com/atelier', this.formData)
        .subscribe({
          next: (response) => {
            this.isLoading = true;

            console.log('Atelier ajouté avec succès', response);
            form.reset();
            // Reset the form model after successful submission
            this.formData = {
              raisonSocial: '',
              responsable: '',
              adresse: '',
              email: '',
              telephone1: '',
              telephone2: '',
              utilisateur: 0,
              dateDebut: '',
              autres: ''
            };
            this.isLoading = true;
            this.router.navigate(['/validation']);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de l\'atelier :', error);
            alert(error.error);
          }
        });
    } else {
      alert('Le formulaire est invalide.');
      this.isLoading = false;

    }
  }


  
    
}
