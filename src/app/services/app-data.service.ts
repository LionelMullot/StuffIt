import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { Collectionnable } from './../models/collectionnable';
import { Category } from '../models/category';
import { Collection } from '../models/collection';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  private currentUser = {
    uid: "tV1zLe4gazWf1XQKZIkkl6k3AIw2"
  };
  private categories: Category[];

  constructor(private angularFire: AngularFireDatabase, public afAuth: AngularFireAuth) { 
    this.getCategories().subscribe(categories => {
      this.categories = categories;
    })
   }

  /**
   * Authentificate user on firebase with a mail and a passwork
   * @param mail Email of the user
   * @param password Password of the user
   */
  public signInWithEmailAndPassword(mail: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(mail, password)
      .then((success) => {
        console.info("%c Sucessful login", "color:#bb00bb")
      })
      .catch((err) => {
        console.info("%c Login failed", "color:#ff0000")
      });

  }

  /**
   * Add an item to the collection of the current user
   * @param categories Category navigation path to the category of the collectionnable
   * @param item Item to add
   */
  public addToCollection(categories: string[], item: Collectionnable) {
    if (categories.length) {
      var path = `collections/${this.currentUser.uid}/`;
      path += categories.reduce((acc, value) => {
        return acc + "/child/" + value;
      })
      return this.angularFire.database.ref(path).push(item.getFormatted());
    }
  }

  /**
   * Retrieve all categories
   */
  public getCategories() {
    let path = "categories/";
    return this.angularFire.object(path).snapshotChanges().map((snapshot) => {
      let rawCategories = snapshot.payload.val();
      return Object.keys(rawCategories).map((id) => {
        return new Category(id, rawCategories[id]);
      })
    });
  }

  /**
   * Retrieve a collection belonging to a specific category path
   * @param categoryPath Array with category id string as a path
   */
  public getCollection(categoryPath: string[]) {
    // Collection wil contain Collection (folder) and Collectionnable (file)
    let collection = [];

    let path = `collections/${this.currentUser.uid}/`;
    if (categoryPath) {
      path += categoryPath.join("/child/");
    }
    return this.angularFire.object(path).snapshotChanges().map(snapshot => {
      let raw = snapshot.payload.val();
      if (raw["child"]) {
        collection = collection.concat(this.parseCollection(raw["child"], categoryPath));
      }
      collection = collection.concat(this.parseCollection(raw, categoryPath).filter(item => {
        return !!item;
      }));
      return collection;
    });
  }

  /**
   * Convert raw data retrieved by the BE to JS object
   * @param data Raw data returned by the BE
   * @param categoryPath Array with category id string as a path
   */
  private parseCollection(data, categoryPath: string[]) {
    return Object.keys(data).map((itemId) => {
      if (itemId != "child") {
        let latestCategory: Category = null;
        let categories: Category[] = this.categories;
        let finder = function(categoryId, category) {
          return category.id === categoryId;
        }

        // Go trought categoryPath to find the current category we are on
        if (categoryPath.length) {
          categoryPath.forEach(categoryId => {
            latestCategory = categories.find(finder.bind(this, categoryId));
            categories = latestCategory.children;
          })
        }
        
        let rawItem = data[itemId];
        if (rawItem.name || rawItem.number) {
          // Final level
          return new Collectionnable(rawItem, latestCategory);
        } else {
          // Still some categories to browse
          let item = categories.find(finder.bind(this, itemId));
          return new Collection(latestCategory, item, rawItem);
        }
      }
    })
  }
}
