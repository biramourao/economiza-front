import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontesDeRendaComponent } from './fontes-de-renda.component';

describe('FontesDeRendaComponent', () => {
  let component: FontesDeRendaComponent;
  let fixture: ComponentFixture<FontesDeRendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontesDeRendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontesDeRendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
