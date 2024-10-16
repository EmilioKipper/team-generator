import { computed, Injectable, signal } from '@angular/core';

// Pra poder ficar clicando em 'gerar time' e re rodar o valor computado
function returnFalse() {
  return false;
}
@Injectable({
  providedIn: 'root',
})
export class TeamListService {
  teamList = signal('', { equal: returnFalse });
  formatedTeamList = computed(() => {
    function textToArray(text: string) {
      return text.split('\n');
    }

    function removeNumbersDashesAndDots(list: string[]) {
      return list.map((item) => item.replace(/[\d.-]+/g, '').trim());
    }

    function shuffleList(array: string[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    }

    function splitTeams(array: string[]) {
      if (array.length % 2 !== 0) {
        array.push('');
      }

      const mid = array.length / 2;
      const firstTeam = array.slice(0, mid);
      const secondTeam = array.slice(mid);

      return [firstTeam, secondTeam];
    }

    const list = this.teamList();
    const listAsArray = textToArray(list);
    const listWithoutNumbers = removeNumbersDashesAndDots(listAsArray);
    const suffledList = shuffleList(listWithoutNumbers);
    const splitedTeams = splitTeams(suffledList);

    return {
      firstTeam: splitedTeams[0],
      secondTeam: splitedTeams[1],
    };
  });
  hasTeamList = computed(() => {
    return !!this.teamList();
  });
}
