import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddUpdateComentarioComponent } from './add-update-comentario.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';


describe('AddUpdateComentarioComponent', () => {
  let component: AddUpdateComentarioComponent;
  let fixture: ComponentFixture<AddUpdateComentarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateComentarioComponent],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()), 
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        HttpClientModule,SharedModule
      ],
      providers: [FirebaseService,ModalController,UtilsService,AngularDelegate
      ,HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});