import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxD2TableComponent } from './ngx-d2-table.component';

describe('NgxD2TableComponent', () => {
  let component: NgxD2TableComponent;
  let fixture: ComponentFixture<NgxD2TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxD2TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxD2TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
