import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingOpPage } from './sing-op.page';

describe('SingOpPage', () => {
  let component: SingOpPage;
  let fixture: ComponentFixture<SingOpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingOpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}
