import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateUserSettingsPage } from './update-user-settings.page';

describe('UpdateUserSettingsPage', () => {
  let component: UpdateUserSettingsPage;
  let fixture: ComponentFixture<UpdateUserSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
