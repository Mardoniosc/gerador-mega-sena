import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadranteComponent } from './quadrante.component';

describe('QuadranteComponent', () => {
  let component: QuadranteComponent;
  let fixture: ComponentFixture<QuadranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
