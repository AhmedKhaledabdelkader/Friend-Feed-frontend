import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowfriendsonlyComponent } from './showfriendsonly.component';

describe('ShowfriendsonlyComponent', () => {
  let component: ShowfriendsonlyComponent;
  let fixture: ComponentFixture<ShowfriendsonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowfriendsonlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowfriendsonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
