import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rxjs00Component } from './rxjs00.component';

describe('Rxjs00Component', () => {
  let component: Rxjs00Component;
  let fixture: ComponentFixture<Rxjs00Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rxjs00Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Rxjs00Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
