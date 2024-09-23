import { signal, WritableSignal } from '@angular/core';

export const teamList: WritableSignal<string[]> = signal([]);
