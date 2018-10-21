import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemBoxComponent } from './components/item-box/item-box.component';
import { ItemBoxListComponent } from './components/item-box-list/item-box-list.component';
import { CollectionComponent } from './views/collection/collection.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemBoxComponent,
    ItemBoxListComponent,
    CollectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
