import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaContentComponent } from './bandeja-content.component';

describe('BandejaContentComponent', () => {
  let component: BandejaContentComponent;
  let fixture: ComponentFixture<BandejaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandejaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
