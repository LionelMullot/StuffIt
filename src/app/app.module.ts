import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { ItemBoxComponent } from './components/item-box/item-box.component';
import { ItemBoxListComponent } from './components/item-box-list/item-box-list.component';
import { CollectionComponent } from './views/collection/collection.component';
import { AddItemComponent } from './views/add-item/add-item.component';
import { environment } from 'src/environments/environment';
import { ItemCategoryBoxComponent } from './components/item-category-box/item-category-box.component';
import { ChoicePopupComponent } from './components/choice-popup/choice-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemBoxComponent,
    ItemBoxListComponent,
    CollectionComponent,
    AddItemComponent,
    ItemCategoryBoxComponent,
    ChoicePopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ItemCategoryBoxComponent]
})
export class AppModule { }
