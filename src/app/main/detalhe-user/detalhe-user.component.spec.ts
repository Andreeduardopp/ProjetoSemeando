import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheUserComponent } from './detalhe-user.component';

describe('DetalheUserComponent', () => {
  let component: DetalheUserComponent;
  let fixture: ComponentFixture<DetalheUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalheUserComponent]
    });
    fixture = TestBed.createComponent(DetalheUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
