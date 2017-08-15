import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GCanvasComponent } from './g-canvas.component';

describe('GCanvasComponent', () => {
  let component: GCanvasComponent;
  let fixture: ComponentFixture<GCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
