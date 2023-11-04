import { Injectable } from '@angular/core';
import { Firestore , collection,addDoc,collectionData, doc, deleteDoc,getDoc,getDocs, getFirestore,setDoc} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { updateProfile,Auth, createUserWithEmailAndPassword,sendPasswordResetEmail,
  signInWithEmailAndPassword,signOut,signInWithPopup,GoogleAuthProvider, getAuth, updateCurrentUser } from '@angular/fire/auth';
import { User } from '../models/user.model';  




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore:Firestore, private auth:Auth) {

  //======= Acceder =========
  }
  signIn(user:User){
    return signInWithEmailAndPassword(getAuth(),user.email,user.password);
  }
  //======== Crear Usuario ========

  singnUp(user:User){
    return createUserWithEmailAndPassword(getAuth(),user.email,user.password);
  }
  //======= Actualizar Usuario======
  updateUser(displayName:string){
    return updateProfile(getAuth().currentUser,{displayName})

  }

  //========= base de datos =========

  setDocument(path: string,data:any){
    return setDoc(doc(getFirestore(), path),data);

  }
  //====== obtener un documento =====
   
  async getDocument(path: string ){
    return (await getDoc(doc(getFirestore(), path))).data();

  }

  //======= enviar email para reestablecer contraseña =========

  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email);

  }



}
