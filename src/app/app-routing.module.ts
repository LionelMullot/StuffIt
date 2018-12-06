import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddItemComponent } from './views/add-item/add-item.component';
import { CollectionComponent } from './views/collection/collection.component';
import { LoginComponent } from './views/login/login.component';
import { LoginActivateGuard } from './auth/login-activate.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/collection',
    pathMatch: 'full'
  },
  { 
    path: 'addItem',
    component: AddItemComponent,
    canActivate:[LoginActivateGuard]
  },
  { 
    path: 'collection',
    component: CollectionComponent
  },
  { 
    path: 'collection/:id',
    component: CollectionComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  } 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [LoginActivateGuard],
  declarations: []
})

export class AppRoutingModule { }
