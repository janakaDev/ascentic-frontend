import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothslitsComponent } from './clothslits.component';

describe('ClothslitsComponent', () => {
  let component: ClothslitsComponent;
  let fixture: ComponentFixture<ClothslitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothslitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothslitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
