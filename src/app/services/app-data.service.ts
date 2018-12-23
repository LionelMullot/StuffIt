import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { Collectionnable } from './../models/collectionnable';
import { Category } from '../models/category';
import { Collection } from '../models/collection';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { combineLatest, Observable } from 'rxjs';
import { Utils } from '../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  public userEmitter: EventEmitter<object> = new EventEmitter<object>();
  private currentUser;
  private categories: Category[];

  constructor(private angularFire: AngularFireDatabase, public afAuth: AngularFireAuth) { 
    this.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      this.userEmitter.emit(this.currentUser);
    });

   }

  /**
   * Authentificate user on firebase with a mail and a passwork
   * @param mail Email of the user
   * @param password Password of the user
   */
  public signInWithEmailAndPassword(mail: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(mail, password);

  }

  public logOut() {
    return this.afAuth.auth.signOut();
  }

  public getCurrentUser(){
    return this.currentUser;
  }

  public getUser(userId){
    let path = `users/${userId}/`;
    return this.angularFire.object(path).snapshotChanges().map(snapshot => {
      let raw = snapshot.payload.val();
      return new User(snapshot.payload.key, raw);
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
      }).sort((a, b) => {
        let aName = a.getName().toLowerCase();
        let bName = b.getName().toLowerCase();
        if (aName === bName) {
          return 0;
        } else if (aName > bName) {
          return 1;
        } else {
          return -1;
        }
      })
    });
  }

  /**
   * Retrieve a collection belonging to a specific category path
   * @param categoryPath Array with category id string as a path
   * @param userId Id of the user we want to retrieve the collection
   */
  public getCollection(categoryPath: string[], userId: string) {
    // Collection wil contain Collection (folder) and Collectionnable (file)
    let collection = [];

    if(!userId && this.getCurrentUser()) {
      userId = this.getCurrentUser().uid;
    }

    let path = `collections/${userId}/`;
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
      collection.sort(this.collectionComparator);
      return collection;
    });
  }

  /**
   * Comparator for Collection and Collectionnable
   * @param a First item to compare
   * @param b Second item to compare
   */
  private collectionComparator(a, b) {
    if(a instanceof Collection && b instanceof Collectionnable) {
      return -1;
    }
    if (b instanceof Collection && a instanceof Collectionnable) {
      return 1;
    }
    if (a instanceof Collection && b instanceof Collection) {
      if (a.getName() < b.getName()) {
        return -1;
      }
      if (a.getName() > b.getName()) {
        return 1;
      }
    }
    if (a instanceof Collectionnable && b instanceof Collectionnable) {
      if (a.getNumber() || b.getNumber()) {
        let aNumber = parseInt(a.getNumber(), 10);
        let bNumber = parseInt(b.getNumber(), 10);
        if (aNumber !== bNumber) {
          return aNumber < bNumber ? -1 : 1;
        }
      }
      if (a.getName() < b.getName()) {
        return -1;
      }
      if (a.getName() > b.getName()) {
        return 1;
      }
    }
    return 0;
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

  public searchUsers(name:string) {
    let collection = [];
    let path = `users/`;
    name = Utils.toFirstLettersUppercase(name);

    let emiter = combineLatest(
      this.angularFire.list(path, ref => ref.orderByChild('firstname').startAt(name).endAt(name + "\uf8ff")).snapshotChanges().map((snapshot) => {
        return snapshot.map((user) => {
          return new User(user.key, user.payload.val());
        });
      }),      
      this.angularFire.list(path, ref => ref.orderByChild('lastname').startAt(name).endAt(name + "\uf8ff")).snapshotChanges().map((snapshot) => {
        return snapshot.map((user) => {
          return new User(user.key, user.payload.val());
        });
      })
    ).map(result => {
      return result[0].concat(result[1]);
    });

    return emiter;
  }

}
