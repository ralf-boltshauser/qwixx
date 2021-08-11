import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';

import { JoinComponent } from './join.component';

describe('JoinComponent', () => {
  let component: JoinComponent;
  let fixture: ComponentFixture<JoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [JoinComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinComponent);
    component = fixture.componentInstance;
    component.data = {} as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
