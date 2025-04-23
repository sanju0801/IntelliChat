import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditProjectComponent } from './add-or-edit-project.component';

describe('AddOrEditProjectComponent', () => {
  let component: AddOrEditProjectComponent;
  let fixture: ComponentFixture<AddOrEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
