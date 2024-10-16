import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFormComponent } from './team-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('TeamFormComponent', () => {
  let component: TeamFormComponent;
  let fixture: ComponentFixture<TeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamFormComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with "Cole a sua lista de pessoas aqui (cada linha representando uma pessoa):"', () => {
    const element: HTMLElement = fixture.nativeElement;
    const p = element.querySelector('p')!;
    expect(p.textContent).toEqual(
      'Cole a sua lista de pessoas aqui (cada linha representando uma pessoa):'
    );
  });

  it('should enable send button when textarea is filled', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button')!;

    component.teamList.setValue('Fake List');

    fixture.detectChanges();

    expect(button.disabled).toEqual(false);
    expect(component.teamList.valid).toEqual(true);
  });

  it('should have button disabled when textarea is empty', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button')!;

    component.teamList.setValue('');

    fixture.detectChanges();

    expect(component.teamList.invalid).toEqual(true);
    expect(button.disabled).toEqual(true);
  });

  it('should call onSubmit on form submit', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const onSubmitSpy = spyOn(component, 'onSubmit');

    form.triggerEventHandler('ngSubmit', null);

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should set team list on service on submit', () => {
    const fakeList = 'Fake list';

    component.teamList.setValue(fakeList);
    component.onSubmit();
    expect(component.teamListService.teamList()).toEqual(fakeList);
  });
});
