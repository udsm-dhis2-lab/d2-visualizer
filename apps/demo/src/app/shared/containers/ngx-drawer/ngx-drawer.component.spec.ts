import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDrawerComponent } from './ngx-drawer.component';

describe('NgxDrawerComponent', () => {
  let component: NgxDrawerComponent;
  let fixture: ComponentFixture<NgxDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
