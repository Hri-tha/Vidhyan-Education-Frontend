import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeCompareComponent } from './college-compare.component';

describe('CollegeCompareComponent', () => {
  let component: CollegeCompareComponent;
  let fixture: ComponentFixture<CollegeCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeCompareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollegeCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
