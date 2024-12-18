import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dowload',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dowload.component.html',
  styleUrl: './dowload.component.css'
})
export class DowloadComponent implements OnInit,OnDestroy {

  goToImage(index: number) {
    this.currentImageIndex = index;
  }
  

  images: string[] = [
    '../../assets/gui.png',
    '../../assets/guid.png',
    '../../assets/guide.png',
    '../../assets/gu.png',
    '../../assets/guidee.png'
    
  ]; // Liste des chemins des images
  currentImageIndex: number = 0; // Index de l'image affichée
  intervalId: any; // Identifiant de l'intervalle

  ngOnInit() {
    this.startSlideshow(); // Démarrer le diaporama au chargement
  }

  ngOnDestroy() {
    this.stopSlideshow(); // Arrêter le diaporama quand le composant est détruit
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 3000); // Changer d'image toutes les 3 secondes
  }

  stopSlideshow() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

    // Fonction pour l'image précédente
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex > 0) 
        ? this.currentImageIndex - 1 
        : this.images.length - 1;
    }
  
    // Fonction pour l'image suivante
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex < this.images.length - 1) 
        ? this.currentImageIndex + 1 
        : 0;
    }
}
