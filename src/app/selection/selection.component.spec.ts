import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionComponent } from './selection.component';
import { FormBuilder } from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('SelectionComponent', () => {
  let component: SelectionComponent;
  let fixture: ComponentFixture<SelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SelectionComponent ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the progress indicator when a download is running', () => {
    component.downloadRunning = true;
    fixture.detectChanges();

    const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));

    expect(progressBar).toBeDefined();
  });

  it('should hide the progress indicator when no download is running', () => {
    component.downloadRunning = false;
    fixture.detectChanges();

    const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));

    expect(progressBar).toBeNull();
  });
});
