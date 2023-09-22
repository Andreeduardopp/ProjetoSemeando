import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSemanaComponent } from './card-semana.component';

describe('CardSemanaComponent', () => {
  let component: CardSemanaComponent;
  let fixture: ComponentFixture<CardSemanaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSemanaComponent]
    });
    fixture = TestBed.createComponent(CardSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
