import { TestBed } from '@angular/core/testing';
import { DoctorSearchComponent } from './doctor-search.component';

describe('DoctorSearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSearchComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DoctorSearchComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});