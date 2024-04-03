import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessyWordsComponent } from './messy-words.component';

describe('MessyWordsComponent', () => {
  let component: MessyWordsComponent;
  let fixture: ComponentFixture<MessyWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessyWordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
