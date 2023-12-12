import { ComponentFixture, TestBed,waitForAsync } from '@angular/core/testing';
import { MainPage } from './main.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainPage],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()), 
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        HttpClientModule
      ],
      providers: [FirebaseService,ModalController,UtilsService,AngularDelegate
      ,HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});;

