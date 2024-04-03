import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchWordDialogComponent } from './match-word-dialog.component';

describe('MatchWordDialogComponent', () => {
  let component: MatchWordDialogComponent;
  let fixture: ComponentFixture<MatchWordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchWordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchWordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
