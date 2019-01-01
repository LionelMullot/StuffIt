import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ItemBoxComponent } from './components/item-box/item-box.component';
import { ItemBoxListComponent } from './components/item-box-list/item-box-list.component';
import { CollectionComponent } from './views/collection/collection.component';
import { AddItemComponent } from './views/add-item/add-item.component';
import { environment } from 'src/environments/environment';
import { ItemCategoryBoxComponent } from './components/item-category-box/item-category-box.component';
import { ChoicePopupComponent } from './components/choice-popup/choice-popup.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemTableLineComponent } from './components/item-table-line/item-table-line.component';
import { ItemTableListComponent } from './components/item-table-list/item-table-list.component';
import { TemplateToogleComponent } from './components/template-toogle/template-toogle.component';
import { LoginComponent } from './views/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SearchComponent } from './views/search/search.component';
import { MissingToogleComponent } from './components/missing-toogle/missing-toogle.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemBoxComponent,
    ItemBoxListComponent,
    CollectionComponent,
    AddItemComponent,
    ItemCategoryBoxComponent,
    ChoicePopupComponent,
    ItemTableLineComponent,
    ItemTableListComponent,
    TemplateToogleComponent,
    LoginComponent,
    LoginFormComponent,
    SearchComponent,
    MissingToogleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ItemCategoryBoxComponent]
})
export class AppModule { }
