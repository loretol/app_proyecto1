import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { GoogleMap } from '@capacitor/google-maps';
import { CapacitorGoogleMaps } from '@capacitor-community/google-maps';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




//===========firebase ========



@NgModule({
  declarations: [AppComponent] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule, 
    IonicModule.forRoot({mode:'md'}),// para que tenga el mismo diseño en todos los sistemas operativos 
    AppRoutingModule, IonicStorageModule.forRoot(),
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()), provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    
    
    ],
    
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
 