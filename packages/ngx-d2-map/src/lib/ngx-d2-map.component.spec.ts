import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxD2MapComponent } from './ngx-d2-map.component';

describe('NgxD2MapComponent', () => {
  let component: NgxD2MapComponent;
  let fixture: ComponentFixture<NgxD2MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxD2MapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxD2MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
