import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVistaComponent } from './home-vista.component';

describe('HomeVistaComponent', () => {
  let component: HomeVistaComponent;
  let fixture: ComponentFixture<HomeVistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeVistaComponent]
    });
    fixture = TestBed.createComponent(HomeVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
