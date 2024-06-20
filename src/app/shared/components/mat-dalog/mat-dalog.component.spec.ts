import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDalogComponent } from './mat-dalog.component';

describe('MatDalogComponent', () => {
  let component: MatDalogComponent;
  let fixture: ComponentFixture<MatDalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
