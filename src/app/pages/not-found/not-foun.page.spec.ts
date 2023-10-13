import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFounPage } from './not-foun.page';

describe('NotFounPage', () => {
  let component: NotFounPage;
  let fixture: ComponentFixture<NotFounPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotFounPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
