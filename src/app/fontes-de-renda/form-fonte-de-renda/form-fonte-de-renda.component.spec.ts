import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFonteDeRendaComponent } from './form-fonte-de-renda.component';

describe('FormFonteDeRendaComponent', () => {
  let component: FormFonteDeRendaComponent;
  let fixture: ComponentFixture<FormFonteDeRendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFonteDeRendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFonteDeRendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
