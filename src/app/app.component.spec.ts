import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should only show app-team-list if hasTeamList is true', () => {
    let appTeamList = fixture.debugElement.query(By.css('app-team-list'));

    expect(appTeamList).toBeNull();

    component.teamListService.teamList.set('Fake team list');

    fixture.detectChanges();

    appTeamList = fixture.debugElement.query(By.css('app-team-list'));

    expect(component.hasTeamList()).toBe(true);
    expect(appTeamList).toBeTruthy();
  });
});
