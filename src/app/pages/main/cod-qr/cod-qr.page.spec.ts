import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodQrPage } from './cod-qr.page';

describe('CodQrPage', () => {
  let component: CodQrPage;
  let fixture: ComponentFixture<CodQrPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(CodQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
