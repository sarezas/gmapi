import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentificationComponent } from './components/identification/identification.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { ArrivalComponent } from './components/arrival/arrival.component';

const routes: Routes = [
  { path: '', component: IdentificationComponent },
  { path: 'geolocation', component: GeolocationComponent },
  { path: 'arrival', component: ArrivalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
