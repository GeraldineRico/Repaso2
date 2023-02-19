import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaFlotanteComponent } from './ventana-flotante.component';

describe('VentanaFlotanteComponent', () => {
  let component: VentanaFlotanteComponent;
  let fixture: ComponentFixture<VentanaFlotanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaFlotanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaFlotanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
