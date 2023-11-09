import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, getDoc, getDocs, getFirestore, setDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import {
  updateProfile, Auth, createUserWithEmailAndPassword, sendPasswordResetEmail,
  signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, getAuth, updateCurrentUser
} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
import{getStorage, uploadString, ref,getDownloadURL} from "@angular/fire/storage"






@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore, private auth: Auth,
     private utilservice: UtilsService) {



  }
  //======= Autenticar =========
  getAuth() {
    return getAuth();
  }
  //======= Acceder =========
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  //======== Crear Usuario ========

  singnUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  //======= Actualizar Usuario======
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })

  }

  //======= enviar email para reestablecer contraseña =========

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);

  }

  //=======Cerrar sesion======

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilservice.routerLink('/auth');
  }


  //**************************** Base de datos *****************************

  //====== setear un documento======

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);

  }
  //====== obtener un documento =====

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();

  }

  //======= Agregar documento=======
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }
  //========================== Almacenamiento ============================

   async uploadImage(path: string, data_url:string){
    return uploadString(ref(getStorage(),path),data_url,'data_url').then(()=>{
      return getDownloadURL(ref(getStorage(),path))
    })
    
  }
}
