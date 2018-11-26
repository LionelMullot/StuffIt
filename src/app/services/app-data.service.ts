import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';


import { Collectionnable } from './../models/collectionnable';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  currentUser = {
    uid: "tV1zLe4gazWf1XQKZIkkl6k3AIw2"
  }

  constructor(private angularFire: AngularFireDatabase, public afAuth: AngularFireAuth) {  }

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
  public addToCollection(categories: string[], item: Collectionnable){
    if (categories.length) {
      var path = `collections/${this.currentUser.uid}/`;
      path += categories.reduce((acc, value) => {
        return acc + "/child/" + value;
      })
      return this.angularFire.database.ref(path).push(item);
    }
  }

  public getCategories(){
    return this.angularFire.database.ref("categories/").once('value').then(function(snapshot) {
      let rawCategories = snapshot.val();
      return Object.keys(rawCategories).map((id) => {
        return new Category(id, rawCategories[id]);
      })
    });
  }
}
