import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, getDoc, getFirestore, setDoc, collectionData, query, updateDoc,deleteDoc } from '@angular/fire/firestore';
import {
  updateProfile, Auth, createUserWithEmailAndPassword, sendPasswordResetEmail,
  signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, getAuth
} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
import { getStorage, uploadString, ref, getDownloadURL, Storage, deleteObject } from "@angular/fire/storage"
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/cometario.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private apiUrl = 'https://salonproyect-default-rtdb.firebaseio.com'
  

  userArray: User[] =[];

  constructor(private firestore: Firestore, private auth: Auth,
    private utilservice: UtilsService, private storage: Storage ,private http: HttpClient) {



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

  //====== obtener documentos de una colección ======

  getCollectionData(path: string, collectioQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectioQuery), { idField: 'id' })

  }

  //====== setear un documento======

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);

  }
  //====== actualizar un documento======

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);

  }
  //====== eliminar un documento======

  deletDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));

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

  //======= subir una imagen ========

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })

  }

  //====== obtener ruta de imagen con url=======
  async getFilepath(url: string) {
    return ref(getStorage(), url).fullPath

  }

  //====== eliminar archivo======
  deleteFile(path: string) {
    return deleteObject(ref(getStorage(), path));

  }



  //======= login con google=======
  loginWhitGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }


  //======= apiRest obteniendo productos en tiempo real=======
 

  getData(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/comentarios.json`).pipe(
      map((data) => {
        // Convierte el objeto de comentarios en un array
        return Object.keys(data).map(key => ({ ...data[key], key }));
      })
    );
  }
  postData(comentario: Comentario): Observable<any> {
    return this.http.post(`${this.apiUrl}/comentarios.json`,comentario);
  }

 
}



  
  




















