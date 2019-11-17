import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasDeGastoComponent } from './categorias-de-gasto.component';

describe('CategoriasDeGastoComponent', () => {
  let component: CategoriasDeGastoComponent;
  let fixture: ComponentFixture<CategoriasDeGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasDeGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasDeGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
