import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCategoriaDeGastoComponent } from './form-categoria-de-gasto.component';

describe('FormCategoriaDeGastoComponent', () => {
  let component: FormCategoriaDeGastoComponent;
  let fixture: ComponentFixture<FormCategoriaDeGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCategoriaDeGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCategoriaDeGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
