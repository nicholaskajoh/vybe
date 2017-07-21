import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicAppComponent } from './music-app.component';

describe('MusicAppComponent', () => {
  let component: MusicAppComponent;
  let fixture: ComponentFixture<MusicAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
