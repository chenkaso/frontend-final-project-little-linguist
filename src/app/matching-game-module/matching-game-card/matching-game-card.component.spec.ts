import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingGameCardComponent } from './matching-game-card.component';

describe('MatchingGameCardComponent', () => {
  let component: MatchingGameCardComponent;
  let fixture: ComponentFixture<MatchingGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingGameCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
