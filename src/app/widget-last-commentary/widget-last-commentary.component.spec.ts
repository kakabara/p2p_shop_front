import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLastCommentaryComponent } from './widget-last-commentary.component';

describe('WidgetLastCommentaryComponent', () => {
  let component: WidgetLastCommentaryComponent;
  let fixture: ComponentFixture<WidgetLastCommentaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetLastCommentaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLastCommentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
