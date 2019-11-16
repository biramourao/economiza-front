import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosGastosComponent } from './graficos-gastos.component';

describe('GraficosGastosComponent', () => {
  let component: GraficosGastosComponent;
  let fixture: ComponentFixture<GraficosGastosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosGastosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
