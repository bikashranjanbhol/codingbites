import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDrawerComponent } from './material-drawer.component';

describe('MaterialDrawerComponent', () => {
  let component: MaterialDrawerComponent;
  let fixture: ComponentFixture<MaterialDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialDrawerComponent]
    });
    fixture = TestBed.createComponent(MaterialDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
