import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore, Firestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { GoogleMap } from '@capacitor/google-maps';
import { CapacitorGoogleMaps } from '@capacitor-community/google-maps';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from './services/firebase.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';







//===========firebase ========



@NgModule({
  declarations: [AppComponent] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule,HttpClientModule,ReactiveFormsModule,FormsModule,
    IonicModule.forRoot({mode:'md'}),// para que tenga el mismo diseño en todos los sistemas operativos 
    AppRoutingModule, IonicStorageModule.forRoot(),
    
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()), 
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    SharedModule
    
    
    ],
    
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
 