import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TeamListComponent } from './team-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamListComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call copyToClipboard on copy button click', () => {
    const el = fixture.debugElement.nativeElement.querySelector('button');
    const spyCopy = spyOn(component, 'copyToClipboard');

    el.click();

    expect(spyCopy).toHaveBeenCalled();
    expect(spyCopy).toHaveBeenCalledTimes(1);
  });

  it('should call addBreakline when copyToClipboard is called', () => {
    const spyAddBreakline = spyOn(component, 'addBreakline');

    component.copyToClipboard();

    expect(spyAddBreakline).toHaveBeenCalled();
  });

  it('should change icon button on button click', fakeAsync(() => {
    const el: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    el.click();

    fixture.detectChanges();
    expect(el.textContent).toEqual('check');

    tick(800);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(el.textContent).toEqual('content_copy');
    });
  }));
});
