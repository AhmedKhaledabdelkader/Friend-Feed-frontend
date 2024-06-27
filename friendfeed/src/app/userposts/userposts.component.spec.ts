import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpostsComponent } from './userposts.component';

describe('UserpostsComponent', () => {
  let component: UserpostsComponent;
  let fixture: ComponentFixture<UserpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
