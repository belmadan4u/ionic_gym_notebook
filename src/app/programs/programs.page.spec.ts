import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Programs } from './programs.page';

describe('Programs', () => {
  let component: Programs;
  let fixture: ComponentFixture<Programs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Programs],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Programs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
