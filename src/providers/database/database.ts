import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";


@Injectable()
export class DatabaseProvider {

  constructor(public afDatabase: AngularFireDatabase) {
    console.log('Hello DatabaseProvider Provider');
    // this.afDatabase.



  }

}
