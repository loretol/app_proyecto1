import { ComponentFixture, TestBed,waitForAsync } from '@angular/core/testing';
import { SingOpPage } from './sing-op.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';

describe('SingOpPage', () => {
  let component: SingOpPage;
  let fixture: ComponentFixture<SingOpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SingOpPage],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()), 
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        HttpClientModule,FormControl, FormGroup, Validators,FormBuilder
      ],
      providers: [FirebaseService,ModalController,UtilsService,AngularDelegate
      ,HttpClient, FormControl, FormGroup, Validators,FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(SingOpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});;
