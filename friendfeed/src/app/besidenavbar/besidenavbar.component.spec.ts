import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BesidenavbarComponent } from './besidenavbar.component';

describe('BesidenavbarComponent', () => {
  let component: BesidenavbarComponent;
  let fixture: ComponentFixture<BesidenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BesidenavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BesidenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
