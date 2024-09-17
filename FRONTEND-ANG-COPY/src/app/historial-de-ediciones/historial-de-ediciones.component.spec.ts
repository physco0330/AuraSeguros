import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDeEdicionesComponent } from './historial-de-ediciones.component';

describe('HistorialDeEdicionesComponent', () => {
  let component: HistorialDeEdicionesComponent;
  let fixture: ComponentFixture<HistorialDeEdicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialDeEdicionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialDeEdicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
