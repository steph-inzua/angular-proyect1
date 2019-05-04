import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment'; // add this 1 of 4

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/cliente').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('personas').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nombreToSearch = value.name.toLowerCase();
    return this.db.collection('personas').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('personas').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('personas').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('personas',ref => ref.where('nombreToSearch', '>=', searchValue)
      .where('nombreToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('personas',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    return this.db.collection('personas').add({
      nombre: value.nombre,
      nombreToSearch: value.nombre.toLowerCase(),
      apellido: value.apellido,
      fechaNacimiento: value.fechaNacimiento,
      edad:moment().diff(value.fechaNacimiento, 'years'),
      avatar: avatar
    });
  }
}
