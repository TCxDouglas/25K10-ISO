import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEvaluationComponent } from './category-evaluation.component';

describe('CategoryEvaluationComponent', () => {
  let component: CategoryEvaluationComponent;
  let fixture: ComponentFixture<CategoryEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
