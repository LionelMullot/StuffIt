import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddItemComponent } from './views/add-item/add-item.component';
import { CollectionComponent } from './views/collection/collection.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/collection',
    pathMatch: 'full'
  },
  { 
    path: 'addItem',
    component: AddItemComponent 
  },
  { 
    path: 'collection',
    component: CollectionComponent
  },
  { 
    path: 'collection/:id',
    component: CollectionComponent
  } 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
