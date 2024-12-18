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
  currentDateTime: string = '';

  ngOnInit(): void {
    const now = new Date();
    // Ajuster l'heure pour le fuseau UTC (Togo)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Format 24h
      timeZone: 'UTC' // Togo utilise UTC
    };

    // Utiliser Intl.DateTimeFormat pour formater en UTC
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(now);

    const year = parts.find((part) => part.type === 'year')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;
    const hour = parts.find((part) => part.type === 'hour')?.value;
    const minute = parts.find((part) => part.type === 'minute')?.value;

    // Formater dans le format ISO pour datetime-local
    this.currentDateTime = `${year}-${month}-${day}T${hour}:${minute}`;
    this.formData.dateDebut = this.currentDateTime; // Initialiser formData
  }
  constructor(private http: HttpClient, private router: Router) {}

  isLoading: boolean = false;

  onSubmit(form: NgForm): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir soumettre ce formulaire ?');
  
    if (confirmation && form.valid) {
      this.isLoading = true; // Activer le cercle de chargement avant d'envoyer la requête.
  
      this.http.post('https://mesure-5fc2.onrender.com/atelier', this.formData)
        .subscribe({
          next: (response) => {
            console.log('Atelier ajouté avec succès', response);
  
            // Attendre 1 seconde avant d'arrêter le cercle et effectuer les actions suivantes.
            setTimeout(() => {
              this.isLoading = false; // Désactiver le cercle de chargement.
  
              form.reset(); // Réinitialiser le formulaire.
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
              this.router.navigate(['/validation']); // Naviguer vers la page de validation.
            }, 1000);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de l\'atelier :', error);
            alert(error.error);
  
            // Attendre 1 seconde avant de désactiver le cercle de chargement même en cas d'erreur.
            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
          }
        });
    } else {
      alert('Le formulaire est invalide.');
      this.isLoading = false; // Désactiver le cercle si le formulaire est invalide.
    }
  }
  

  
    
}
