import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothsaddeditComponent } from './clothsaddedit.component';

describe('ClothsaddeditComponent', () => {
  let component: ClothsaddeditComponent;
  let fixture: ComponentFixture<ClothsaddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothsaddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothsaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
