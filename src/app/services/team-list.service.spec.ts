import { TestBed } from '@angular/core/testing';

import { TeamListService } from './team-list.service';

describe('TeamListService', () => {
  let service: TeamListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to set a list and split teams with same size', () => {
    const fakeListWithEvenSize = 'abc \n def';
    const evenTeamSize = 1;

    service.teamList.set(fakeListWithEvenSize);

    expect(service.teamList()).toEqual(fakeListWithEvenSize);
    expect(service.hasTeamList()).toEqual(true);
    expect(service.formatedTeamList().firstTeam).toHaveSize(evenTeamSize);
    expect(service.formatedTeamList().secondTeam).toHaveSize(evenTeamSize);

    const fakeListWithOddSize = 'abc \n def \n hij';
    const oddTeamSize = 2;

    service.teamList.set(fakeListWithOddSize);

    expect(service.teamList()).toEqual(fakeListWithOddSize);
    expect(service.hasTeamList()).toEqual(true);
    expect(service.formatedTeamList().firstTeam).toHaveSize(oddTeamSize);
    expect(service.formatedTeamList().secondTeam).toHaveSize(oddTeamSize);
  });

  it('should remove numbers/dots/dashes from list', () => {
    const fakeList = '1. Abc \n2. Def';

    service.teamList.set(fakeList);

    expect(service.teamList()).toEqual(fakeList);
    expect(service.hasTeamList()).toEqual(true);
    expect(service.formatedTeamList().firstTeam).not.toMatch(/[\d.-]+/g);
    expect(service.formatedTeamList().secondTeam).not.toMatch(/[\d.-]+/g);
  });
});
