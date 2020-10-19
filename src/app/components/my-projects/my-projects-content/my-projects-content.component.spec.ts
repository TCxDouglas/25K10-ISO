import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsContentComponent } from './my-projects-content.component';

describe('MyProjectsContentComponent', () => {
  let component: MyProjectsContentComponent;
  let fixture: ComponentFixture<MyProjectsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProjectsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
