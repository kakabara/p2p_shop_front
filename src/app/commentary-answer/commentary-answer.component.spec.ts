import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaryAnswerComponent } from './commentary-answer.component';

describe('CommentaryAnswerComponent', () => {
  let component: CommentaryAnswerComponent;
  let fixture: ComponentFixture<CommentaryAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentaryAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaryAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
