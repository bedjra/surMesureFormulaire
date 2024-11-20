import { Routes } from '@angular/router';
import { BienComponent } from './bien/bien.component';
import { DowloadComponent } from './dowload/dowload.component';
import { FormulaireComponent } from './formulaire/formulaire.component';

export const routes: Routes = [

    { path: '', component: FormulaireComponent },
    { path: 'validation', component: BienComponent },
    { path: 'dowload', component: DowloadComponent },


];
