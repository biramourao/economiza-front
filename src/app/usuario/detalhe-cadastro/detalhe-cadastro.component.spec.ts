import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheCadastroComponent } from './detalhe-cadastro.component';

describe('DetalheCadastroComponent', () => {
  let component: DetalheCadastroComponent;
  let fixture: ComponentFixture<DetalheCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
